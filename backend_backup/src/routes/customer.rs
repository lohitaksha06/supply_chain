use axum::{
    extract::{Json, State},
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::db::entities::add_customer;

#[derive(Deserialize)]
pub struct CustomerSignup {
    pub name: String,
    pub location: String,
    pub registration_id: String,
}

#[derive(Serialize)]
pub struct CustomerResponse {
    pub message: String,
}

// GET /api/customer/dashboard
async fn customer_dashboard() -> String {
    "Welcome to the Customer Dashboard!".to_string()
}

// POST /api/customer/signup
async fn signup_customer(
    State(pool): State<Arc<SqlitePool>>,
    Json(data): Json<CustomerSignup>,
) -> Result<Json<CustomerResponse>, (axum::http::StatusCode, String)> {
    if let Err(err) = add_customer(
        &pool,
        &data.name,
        &data.location,
        &data.registration_id,
    ).await {
        return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, err.to_string()));
    }

    Ok(Json(CustomerResponse {
        message: "Customer registered successfully".to_string(),
    }))
}

pub fn customer_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/customer/dashboard", get(customer_dashboard))
        .route("/api/customer/signup", post(signup_customer))
        .with_state(pool)
}
