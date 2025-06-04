use axum::{
    extract::{Json, State},
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::db::entities::add_company;


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


pub fn company_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/company/dashboard", get(company_dashboard))
        .route("/api/company/signup", post(signup_company))
        .with_state(pool)
}
async fn signup_company(
    State(pool): State<Arc<SqlitePool>>,
    Json(data): Json<CompanySignup>,
) -> Result<Json<CompanyResponse>, (axum::http::StatusCode, String)> {
    // Insert the company into the database
    if let Err(err) = add_company(
        &pool,
        &data.name,
        &data.location,
        &data.license_id,
        &data.stock_needed,
    ).await {
        return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, err.to_string()));
    }

    Ok(Json(CompanyResponse {
        message: "Company registered successfully".to_string(),
    }))
}
