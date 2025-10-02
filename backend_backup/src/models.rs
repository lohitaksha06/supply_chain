use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Deserialize)]
pub struct SignupData {
    pub username: String,
    pub email: String,
    pub password: String,
    pub role: String, // 👈 Added for role selection (customer/hospital/company)
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
    pub role: String,
}


#[derive(Debug, FromRow)]
pub struct User {
    pub id: String, // 👈 Changed from i64 to String to match UUID
    pub username: String,
    pub email: String,
    pub password: String,
    pub role: String, // 👈 Added role to user struct
}
