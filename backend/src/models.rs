use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Deserialize)]
pub struct SignupData {
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct LoginData {
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct ApiResponse {
    pub message: String,
}

#[derive(Serialize)]
pub struct LoginResponse {
    pub token: String,
    pub user: String,
}

#[derive(Debug, FromRow)]
pub struct User {
    pub id: i64,
    pub username: String,
    pub email: String,
    pub password: String,
}
