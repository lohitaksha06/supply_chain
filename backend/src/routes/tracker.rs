use axum::{
    extract::{Json, State},
    routing::post,
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use std::sync::Arc;
use sha2::{Sha256, Digest};
use chrono::Utc;

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
    pub batch_hash: String,
}

// Helper: generate SHA256 hash
fn generate_hash(data: &str) -> String {
    let mut hasher = Sha256::new();
    hasher.update(data);
    format!("{:x}", hasher.finalize())
}

// POST /api/tracker/add
async fn add_batch(
    State(pool): State<Arc<SqlitePool>>,
    Json(batch): Json<Batch>,
) -> Result<Json<TrackerResponse>, (axum::http::StatusCode, String)> {
    let timestamp = Utc::now().to_rfc3339();
    let hash_input = format!(
        "{}{}{}{}{}",
        batch.batch_id, batch.medicine_name, batch.source, batch.destination, timestamp
    );
    let batch_hash = generate_hash(&hash_input);

    let query = "INSERT INTO medicine_batches (batch_id, medicine_name, source, destination, timestamp, hash) VALUES (?, ?, ?, ?, ?, ?)";
    if let Err(err) = sqlx::query(query)
        .bind(&batch.batch_id)
        .bind(&batch.medicine_name)
        .bind(&batch.source)
        .bind(&batch.destination)
        .bind(&timestamp)
        .bind(&batch_hash)
        .execute(pool.as_ref())
        .await
    {
        return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, err.to_string()));
    }

    Ok(Json(TrackerResponse {
        message: "Batch added and hashed".to_string(),
        batch_hash,
    }))
}

pub fn tracker_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/tracker/add", post(add_batch))
        .with_state(pool)
}
