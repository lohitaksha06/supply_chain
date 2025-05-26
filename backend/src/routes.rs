use axum::{Json, extract::State};
use uuid::Uuid;
use sqlx::sqlite::SqlitePool;
use crate::models::{SignupData, ApiResponse};
use crate::db::get_db_pool;

pub async fn signup(
    Json(payload): Json<SignupData>,
) -> Json<ApiResponse> {
    let pool = get_db_pool().await.unwrap();
    let id = Uuid::new_v4().to_string();

    let res = sqlx::query("INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)")
        .bind(&id)
        .bind(&payload.username)
        .bind(&payload.email)
        .bind(&payload.password) // Consider hashing it later!
        .execute(&pool)
        .await;

    match res {
        Ok(_) => Json(ApiResponse { message: "User registered".into() }),
        Err(_) => Json(ApiResponse { message: "Error registering user".into() }),
    }
}
