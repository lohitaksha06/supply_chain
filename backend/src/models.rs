use serde::{Deserialize, Serialize};

#[derive(Deserialize)]
pub struct SignupData {
    pub username: String,
    pub email: String,
    pub password: String,
}

#[derive(Serialize)]
pub struct ApiResponse {
    pub message: String,
}

#[derive(Debug, sqlx::FromRow)]
pub struct User {
    pub id: i64,
    pub username: String,
    pub email: String,
    pub password: String,
}
