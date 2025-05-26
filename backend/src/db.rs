use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};

pub async fn init_db() -> Result<(), sqlx::Error> {
    let pool = get_db_pool().await?;

    sqlx::query(
        "CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            username TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        )"
    )
    .execute(&pool)
    .await?;

    Ok(())
}

pub async fn get_db_pool() -> Result<SqlitePool, sqlx::Error> {
    let db_url = std::env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = SqlitePoolOptions::new()
        .connect(&db_url)
        .await?;

    Ok(pool)
}
