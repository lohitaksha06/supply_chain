use sqlx::SqlitePool;
use uuid::Uuid;
use chrono::Utc;
use sha2::{Sha256, Digest};

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
}

/// Computes a batch hash using all its data plus the previous hash (for hash chaining).
pub fn compute_batch_hash(
    batch_id: &str,
    medicine_name: &str,
    source: &str,
    destination: &str,
    timestamp: &str,
    previous_hash: &str,
) -> String {
    let data = format!("{batch_id}|{medicine_name}|{source}|{destination}|{timestamp}|{previous_hash}");
    let mut hasher = Sha256::new();
    hasher.update(data.as_bytes());
    format!("{:x}", hasher.finalize())
}

/// Creates all required tables, including updated medicine_batches table with `previous_hash`.
pub async fn create_tables(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS companies (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            license_id TEXT NOT NULL,
            stock_needed TEXT NOT NULL
        )",
    ).execute(pool).await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS hospitals (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            registration_id TEXT NOT NULL
        )",
    ).execute(pool).await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS customers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            registration_id TEXT NOT NULL
        )",
    ).execute(pool).await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS medicine_batches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            batch_id TEXT NOT NULL UNIQUE,
            medicine_name TEXT NOT NULL,
            source TEXT NOT NULL,
            destination TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            hash TEXT NOT NULL,
            previous_hash TEXT NOT NULL
        )",
    ).execute(pool).await?;

    Ok(())
}

/// Adds a company record.
pub async fn add_company(
    pool: &SqlitePool,
    name: &str,
    location: &str,
    license_id: &str,
    stock_needed: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO companies (id, name, location, license_id, stock_needed) VALUES (?, ?, ?, ?, ?)",
    )
    .bind(Uuid::new_v4().to_string())
    .bind(name)
    .bind(location)
    .bind(license_id)
    .bind(stock_needed)
    .execute(pool)
    .await?;

    Ok(())
}

/// Adds a hospital record.
pub async fn add_hospital(
    pool: &SqlitePool,
    name: &str,
    location: &str,
    registration_id: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO hospitals (id, name, location, registration_id) VALUES (?, ?, ?, ?)",
    )
    .bind(Uuid::new_v4().to_string())
    .bind(name)
    .bind(location)
    .bind(registration_id)
    .execute(pool)
    .await?;

    Ok(())
}

/// Adds a customer record.
pub async fn add_customer(
    pool: &SqlitePool,
    name: &str,
    location: &str,
    registration_id: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO customers (id, name, location, registration_id) VALUES (?, ?, ?, ?)",
    )
    .bind(Uuid::new_v4().to_string())
    .bind(name)
    .bind(location)
    .bind(registration_id)
    .execute(pool)
    .await?;

    Ok(())
}

/// Adds a medicine batch with blockchain-style hash chaining.
pub async fn add_batch_with_hash(
    pool: &SqlitePool,
    batch_id: &str,
    medicine_name: &str,
    source: &str,
    destination: &str,
) -> Result<(), sqlx::Error> {
    let timestamp = Utc::now().to_rfc3339();

    // Get previous batch hash (latest batch by timestamp)
    let previous_hash: Option<String> = sqlx::query_scalar(
        "SELECT hash FROM medicine_batches ORDER BY timestamp DESC LIMIT 1",
    )
    .fetch_optional(pool)
    .await?;

    let previous_hash = previous_hash.unwrap_or_else(|| "GENESIS".to_string());

    let hash = compute_batch_hash(
        batch_id,
        medicine_name,
        source,
        destination,
        &timestamp,
        &previous_hash,
    );

    sqlx::query(
        "INSERT INTO medicine_batches (batch_id, medicine_name, source, destination, timestamp, hash, previous_hash)
         VALUES (?, ?, ?, ?, ?, ?, ?)",
    )
    .bind(batch_id)
    .bind(medicine_name)
    .bind(source)
    .bind(destination)
    .bind(&timestamp)
    .bind(&hash)
    .bind(&previous_hash)
    .execute(pool)
    .await?;

    Ok(())
}
