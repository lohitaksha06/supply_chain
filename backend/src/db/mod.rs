pub mod entities;

use sqlx::{sqlite::SqlitePoolOptions, SqlitePool};
use std::env;

use crate::db::entities::User;
use crate::db::entities::create_tables;

/// Initializes the database by creating necessary tables.
/// Initializes the database by creating necessary tables.
pub async fn init_db() -> Result<(), sqlx::Error> {
    let pool = get_db_pool().await?;

    // Create users table
    sqlx::query(
        "CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            role TEXT NOT NULL
        )",
    )
    .execute(&pool)
    .await?;

    // 🔥 Add this line to create other tables (companies, hospitals, customers)
    create_tables(&pool).await?;

    Ok(())
}


/// Returns a connection pool to the SQLite database.
pub async fn get_db_pool() -> Result<SqlitePool, sqlx::Error> {
    let db_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = SqlitePoolOptions::new()
        .connect(&db_url)
        .await?;

    Ok(pool)
}

/// Adds a new user to the database.
pub async fn add_user(
    pool: &SqlitePool,
    username: &str,
    email: &str,
    password: &str,
    role: &str,
) -> Result<(), sqlx::Error> {
    sqlx::query(
        "INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)",
    )
    .bind(uuid::Uuid::new_v4().to_string())
    .bind(username)
    .bind(email)
    .bind(password)
    .bind(role)
    .execute(pool)
    .await?;

    Ok(())
}

/// Finds a user by their email address.
pub async fn find_user_by_email(
    pool: &SqlitePool,
    email: &str,
) -> Result<Option<User>, sqlx::Error> {
    let user = sqlx::query_as::<_, User>(
        "SELECT id, username, email, password, role FROM users WHERE email = ?",
    )
    .bind(email)
    .fetch_optional(pool)
    .await?;

    Ok(user)
}
