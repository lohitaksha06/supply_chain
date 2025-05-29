use axum::{Json, extract::State};
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::models::{SignupData, ApiResponse};
use crate::db::add_user;

pub async fn signup(
    State(pool): State<Arc<SqlitePool>>,
    Json(payload): Json<SignupData>,
) -> Json<ApiResponse> {
    let result = add_user(&pool, &payload.username, &payload.email, &payload.password).await;

    match result {
        Ok(_) => Json(ApiResponse {
            message: "User signed up successfully".to_string(),
        }),
        Err(e) => {
            eprintln!("Signup error: {}", e);
            Json(ApiResponse {
                message: "Signup failed".to_string(),
            })
        }
    }
}
