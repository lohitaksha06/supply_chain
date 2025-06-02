use axum::{
    extract::{Json, State},
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use std::sync::Arc;

#[derive(Deserialize)]
pub struct CompanySignup {
    pub name: String,
    pub location: String,
    pub license_id: String,
    pub stock_needed: String,
}

#[derive(Serialize)]
pub struct CompanyResponse {
    pub message: String,
}

// GET /api/company/dashboard
async fn company_dashboard() -> String {
    "Welcome to the Company Dashboard!".to_string()
}

// POST /api/company/signup
async fn signup_company(
    State(pool): State<Arc<SqlitePool>>,
    Json(data): Json<CompanySignup>,
) -> Json<CompanyResponse> {
    // TODO: Insert into DB
    println!(
        "Received signup from {} at {} with license {}",
        data.name, data.location, data.license_id
    );

    Json(CompanyResponse {
        message: "Company registered successfully".to_string(),
    })
}

pub fn company_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/company/dashboard", get(company_dashboard))
        .route("/api/company/signup", post(signup_company))
        .with_state(pool)
}
