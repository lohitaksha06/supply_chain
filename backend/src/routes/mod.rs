pub mod auth;
pub mod company;
pub mod customer;
pub mod hospital;
pub mod tracker;

use axum::Router;
use std::sync::Arc;
use sqlx::SqlitePool;

pub fn create_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .merge(auth::create_routes(pool.clone())) // ✅ Add auth routes
        .merge(company::company_routes(pool.clone()))
        .merge(customer::customer_routes(pool.clone()))
        .merge(hospital::hospital_routes(pool.clone()))
        .merge(tracker::tracker_routes(pool.clone())) // ✅ Add tracker routes
}

