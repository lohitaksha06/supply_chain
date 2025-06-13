use sqlx::SqlitePool;
use uuid::Uuid;
use chrono::Utc;
use sha2::{Sha256, Digest};
use rsa::{RsaPrivateKey, RsaPublicKey, pkcs1::DecodeRsaPublicKey};
use rsa::signature::Verifier;
use base64::{decode, encode};

/// Structs
#[derive(sqlx::FromRow, Debug)]
pub struct Company {
    pub id: String,
    pub name: String,
    pub location: String,
    pub license_id: String,
    pub stock_needed: String,
}

#[derive(sqlx::FromRow, Debug)]
pub struct Hospital {
    pub id: String,
    pub name: String,
    pub location: String,
    pub registration_id: String,
}

#[derive(sqlx::FromRow, Debug)]
pub struct Customer {
    pub id: String,
    pub name: String,
    pub location: String,
    pub registration_id: String,
}

#[derive(sqlx::FromRow, Debug)]
pub struct MedicineBatch {
    pub id: i64,
    pub batch_id: String,
    pub medicine_name: String,
    pub source: String,
    pub destination: String,
    pub timestamp: String,
    pub hash: String,
    pub previous_hash: String,
    pub signature: Option<String>,
    pub public_key: Option<String>,
}

#[derive(sqlx::FromRow, Debug)]
pub struct OnchainBatch {
    pub batch_id: String,
    pub batch_hash: String,
    pub merkle_root: String,
    pub timestamp: String,
}

/// Hash computation (with chaining)
pub fn compute_batch_hash(
    batch_id: &str,
    medicine_name: &str,
    source: &str,
    destination: &str,
    timestamp: &str,
    previous_hash: &str,
) -> String {
    let data = format!(
        "{batch_id}|{medicine_name}|{source}|{destination}|{timestamp}|{previous_hash}"
    );
    let mut hasher = Sha256::new();
    hasher.update(data.as_bytes());
    format!("{:x}", hasher.finalize())
}

/// Create tables
pub async fn create_tables(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS companies (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            license_id TEXT NOT NULL,
            stock_needed TEXT NOT NULL
        )"
    )
    .execute(pool).await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS hospitals (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            registration_id TEXT NOT NULL
        )"
    )
    .execute(pool).await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS customers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            registration_id TEXT NOT NULL
        )"
    )
    .execute(pool).await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS medicine_batches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            batch_id TEXT NOT NULL UNIQUE,
            medicine_name TEXT NOT NULL,
            source TEXT NOT NULL,
            destination TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            hash TEXT NOT NULL,
            previous_hash TEXT NOT NULL,
            signature TEXT NOT NULL,
            public_key TEXT NOT NULL
        )"
    )
    .execute(pool).await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS onchain_batches (
            batch_id TEXT PRIMARY KEY,
            batch_hash TEXT NOT NULL,
            merkle_root TEXT NOT NULL,
            timestamp TEXT NOT NULL
        )"
    )
    .execute(pool).await?;

    Ok(())
}

/// Add records
pub async fn add_company(pool: &SqlitePool, name: &str, location: &str, license_id: &str, stock_needed: &str) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO companies (id, name, location, license_id, stock_needed)
         VALUES (?, ?, ?, ?, ?)"
    )
    .bind(Uuid::new_v4().to_string())
    .bind(name)
    .bind(location)
    .bind(license_id)
    .bind(stock_needed)
    .execute(pool).await?;

    Ok(())
}

pub async fn add_hospital(pool: &SqlitePool, name: &str, location: &str, registration_id: &str) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO hospitals (id, name, location, registration_id)
         VALUES (?, ?, ?, ?)"
    )
    .bind(Uuid::new_v4().to_string())
    .bind(name)
    .bind(location)
    .bind(registration_id)
    .execute(pool).await?;

    Ok(())
}

pub async fn add_customer(pool: &SqlitePool, name: &str, location: &str, registration_id: &str) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO customers (id, name, location, registration_id)
         VALUES (?, ?, ?, ?)"
    )
    .bind(Uuid::new_v4().to_string())
    .bind(name)
    .bind(location)
    .bind(registration_id)
    .execute(pool).await?;

    Ok(())
}

/// Add batch + hash chaining + signature + on-chain proof
pub async fn add_batch_with_hash(
    pool: &SqlitePool,
    batch_id: &str,
    medicine_name: &str,
    source: &str,
    destination: &str,
    merkle_root: &str,
) -> Result<(), sqlx::Error> {
    let timestamp = Utc::now().to_rfc3339();

    let previous_hash: Option<String> = sqlx::query_scalar(
        "SELECT hash FROM medicine_batches ORDER BY timestamp DESC LIMIT 1"
    )
    .fetch_optional(pool)
    .await?;

    let previous_hash = previous_hash.unwrap_or_else(|| "GENESIS".to_string());

    let batch_hash = compute_batch_hash(
        batch_id, medicine_name, source, destination, &timestamp, &previous_hash,
    );

    let private_key = RsaPrivateKey::new(&mut rand::thread_rng(), 2048).unwrap();
    let public_key = RsaPublicKey::from(&private_key);
    let signature_bytes = private_key.sign(rsa::Pkcs1v15Sign::new::<Sha256>(), batch_hash.as_bytes()).unwrap();

    let signature_base64 = encode(&signature_bytes);
    let public_key_pem = encode(public_key.to_pkcs1_der().unwrap());

    sqlx::query(
        "INSERT INTO medicine_batches (
            batch_id, medicine_name, source, destination, timestamp, hash, previous_hash, signature, public_key
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(batch_id)
    .bind(medicine_name)
    .bind(source)
    .bind(destination)
    .bind(&timestamp)
    .bind(&batch_hash)
    .bind(&previous_hash)
    .bind(&signature_base64)
    .bind(&public_key_pem)
    .execute(pool)
    .await?;

    store_onchain_proof(pool, batch_id, &batch_hash, merkle_root, &timestamp).await?;

    Ok(())
}

pub async fn store_onchain_proof(pool: &SqlitePool, batch_id: &str, batch_hash: &str, merkle_root: &str, timestamp: &str) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO onchain_batches (batch_id, batch_hash, merkle_root, timestamp)
         VALUES (?, ?, ?, ?)"
    )
    .bind(batch_id)
    .bind(batch_hash)
    .bind(merkle_root)
    .bind(timestamp)
    .execute(pool)
    .await?;

    Ok(())
}

/// Verify batch
pub async fn verify_batch_signature(pool: &SqlitePool, batch_id: &str) -> Result<(bool, String), sqlx::Error> {
    let batch = sqlx::query_as!(
        MedicineBatch,
        "SELECT * FROM medicine_batches WHERE batch_id = ?",
        batch_id
    )
    .fetch_one(pool)
    .await?;

    let onchain = sqlx::query_as!(
        OnchainBatch,
        "SELECT * FROM onchain_batches WHERE batch_id = ?",
        batch_id
    )
    .fetch_one(pool)
    .await?;

    let recomputed_hash = compute_batch_hash(
        &batch.batch_id,
        &batch.medicine_name,
        &batch.source,
        &batch.destination,
        &batch.timestamp,
        &batch.previous_hash,
    );

    if recomputed_hash != onchain.batch_hash {
        return Ok((false, "Batch hash mismatch (Merkle root invalid)".to_string()));
    }

    let pub_key_der = decode(&batch.public_key.unwrap()).unwrap();
    let pub_key = RsaPublicKey::from_pkcs1_der(&pub_key_der).unwrap();

    let signature = decode(&batch.signature.unwrap()).unwrap();

    let verified = pub_key
        .verify(rsa::Pkcs1v15Sign::new::<Sha256>(), recomputed_hash.as_bytes(), &signature)
        .is_ok();

    if verified {
        Ok((true, "Batch signature and Merkle proof valid".to_string()))
    } else {
        Ok((false, "Signature verification failed".to_string()))
    }
}
