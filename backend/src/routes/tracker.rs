use axum::{
    extract::{Json, State},
    routing::{get, post},
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use std::sync::Arc;

#[derive(Deserialize)]
pub struct Batch {
    pub batch_id: String,
    pub medicine_name: String,
    pub source: String,
    pub destination: String,
}

#[derive(Serialize)]
pub struct TrackerResponse {
    pub message: String,
}

// POST /api/tracker/add
async fn add_batch(
    State(pool): State<Arc<SqlitePool>>,
    Json(batch): Json<Batch>,
) -> Json<TrackerResponse> {
    // TODO: Save to DB
    println!(
        "New batch {} of {} from {} to {}",
        batch.batch_id, batch.medicine_name, batch.source, batch.destination
    );

    Json(TrackerResponse {
        message: "Batch added".to_string(),
    })
}

pub fn tracker_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/tracker/add", post(add_batch))
        .with_state(pool)
}
