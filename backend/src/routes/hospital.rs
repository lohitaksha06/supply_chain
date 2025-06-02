// src/routes/hospital.rs
use axum::{
    extract::{Json, State},
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use std::sync::Arc;
use crate::db::entities::add_hospital;


#[derive(Deserialize)]
pub struct HospitalSignup {
    pub name: String,
    pub location: String,
    pub registration_id: String,
}

#[derive(Serialize)]
pub struct HospitalResponse {
    pub message: String,
}

// GET /api/hospital/dashboard
async fn hospital_dashboard() -> String {
    "Welcome to the Hospital Dashboard!".to_string()
}

// POST /api/hospital/signup
async fn signup_hospital(
    State(_pool): State<Arc<SqlitePool>>,
    Json(data): Json<HospitalSignup>,
) -> Json<HospitalResponse> {
    println!(
        "Received signup from hospital {} at {} with reg ID {}",
        data.name, data.location, data.registration_id
    );

    Json(HospitalResponse {
        message: "Hospital registered successfully".to_string(),
    })
}

pub fn hospital_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/hospital/dashboard", get(hospital_dashboard))
        .route("/api/hospital/signup", post(signup_hospital))
        .with_state(pool)
}
