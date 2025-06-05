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
}

/// Reusable hash computation for blockchain-style verification.
pub fn compute_batch_hash(
    batch_id: &str,
    medicine_name: &str,
    source: &str,
    destination: &str,
    timestamp: &str,
) -> String {
    let data = format!("{batch_id}|{medicine_name}|{source}|{destination}|{timestamp}");
    let mut hasher = Sha256::new();
    hasher.update(data.as_bytes());
    format!("{:x}", hasher.finalize())
}

/// Creates all required tables.
pub async fn create_tables(pool: &SqlitePool) -> Result<(), sqlx::Error> {
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS companies (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            license_id TEXT NOT NULL,
            stock_needed TEXT NOT NULL
        )",
    )
    .execute(pool)
    .await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS hospitals (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            registration_id TEXT NOT NULL
        )",
    )
    .execute(pool)
    .await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS customers (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            location TEXT NOT NULL,
            registration_id TEXT NOT NULL
        )",
    )
    .execute(pool)
    .await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS medicine_batches (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            batch_id TEXT NOT NULL UNIQUE,
            medicine_name TEXT NOT NULL,
            source TEXT NOT NULL,
            destination TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            hash TEXT NOT NULL
        )",
    )
    .execute(pool)
    .await?;

    Ok(())
}

/// Adds a company record to the database.
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

/// Adds a hospital record to the database.
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

/// Adds a customer record to the database.
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

/// Adds a medicine batch with computed blockchain-style hash.
pub async fn add_batch_with_hash(
    pool: &SqlitePool,
    batch_id: &str,
    medicine_name: &str,
    source: &str,
    destination: &str,
) -> Result<(), sqlx::Error> {
    let timestamp = Utc::now().to_rfc3339();
    let hash = compute_batch_hash(batch_id, medicine_name, source, destination, &timestamp);

    sqlx::query(
        "INSERT INTO medicine_batches (batch_id, medicine_name, source, destination, timestamp, hash)
         VALUES (?, ?, ?, ?, ?, ?)",
    )
    .bind(batch_id)
    .bind(medicine_name)
    .bind(source)
    .bind(destination)
    .bind(timestamp)
    .bind(hash)
    .execute(pool)
    .await?;

    Ok(())
}
