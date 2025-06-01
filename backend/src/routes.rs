use axum::{
    extract::State,
    routing::post,
    Json, Router,
};
use std::sync::Arc;
use sqlx::SqlitePool;
use crate::models::{SignupData, ApiResponse, LoginData, LoginResponse};
use crate::db::{add_user, find_user_by_email};

pub fn create_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/signup", post(signup))
        .route("/api/login", post(login))
        .with_state(pool)
}

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

pub async fn login(
    State(pool): State<Arc<SqlitePool>>,
    Json(payload): Json<LoginData>,
) -> Json<LoginResponse> {
    match find_user_by_email(&pool, &payload.email).await {
        Ok(Some(user)) => {
            if user.password == payload.password {
                Json(LoginResponse {
                    token: "mock-token-123".to_string(), // TODO: Replace with JWT
                    user: user.username,
                })
            } else {
                Json(LoginResponse {
                    token: "".to_string(),
                    user: "Invalid password".to_string(),
                })
            }
        }
        Ok(None) => Json(LoginResponse {
            token: "".to_string(),
            user: "User not found".to_string(),
        }),
        Err(e) => {
            eprintln!("Login error: {}", e);
            Json(LoginResponse {
                token: "".to_string(),
                user: "Login failed".to_string(),
            })
        }
    }
}
