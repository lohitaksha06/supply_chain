pub mod company;
pub mod customer;
pub mod hospital;
pub mod tracker; // ✅ Add tracker module

use axum::Router;
use std::sync::Arc;
use sqlx::SqlitePool;

pub fn create_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .merge(company::company_routes(pool.clone()))
        .merge(customer::customer_routes(pool.clone()))
        .merge(hospital::hospital_routes(pool.clone()))
        .merge(tracker::tracker_routes(pool.clone())) // ✅ Add tracker routes
}


