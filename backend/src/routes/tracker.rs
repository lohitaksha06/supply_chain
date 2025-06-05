use axum::{
    extract::{Json, Path, State},
    routing::{get, post},
    http::StatusCode,
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::SqlitePool;
use std::sync::Arc;
use chrono::Utc;

use crate::entities::compute_batch_hash;

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

#[derive(Serialize)]
pub struct VerifyResponse {
    pub valid: bool,
    pub message: String,
}

/// POST /api/tracker/add
/// Adds a medicine batch with a blockchain-style hash.
async fn add_batch(
    State(pool): State<Arc<SqlitePool>>,
    Json(batch): Json<Batch>,
) -> Result<Json<TrackerResponse>, (StatusCode, String)> {
    let timestamp = Utc::now().to_rfc3339();
    let batch_hash = compute_batch_hash(
        &batch.batch_id,
        &batch.medicine_name,
        &batch.source,
        &batch.destination,
        &timestamp,
    );

    let query = "INSERT INTO medicine_batches 
        (batch_id, medicine_name, source, destination, timestamp, hash) 
        VALUES (?, ?, ?, ?, ?, ?)";

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
        return Err((StatusCode::INTERNAL_SERVER_ERROR, err.to_string()));
    }

    Ok(Json(TrackerResponse {
        message: "Batch added and hashed".to_string(),
        batch_hash,
    }))
}

/// GET /api/tracker/verify/:batch_id
/// Verifies if a batch's hash matches the recomputed hash
async fn verify_batch(
    State(pool): State<Arc<SqlitePool>>,
    Path(batch_id): Path<String>,
) -> Result<Json<VerifyResponse>, (StatusCode, String)> {
    let row = sqlx::query!(
        "SELECT medicine_name, source, destination, timestamp, hash FROM medicine_batches WHERE batch_id = ?",
        batch_id
    )
    .fetch_optional(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Some(batch) = row {
        let recomputed_hash = compute_batch_hash(
            &batch_id,
            &batch.medicine_name,
            &batch.source,
            &batch.destination,
            &batch.timestamp,
        );

        let is_valid = recomputed_hash == batch.hash;
        let msg = if is_valid {
            "Batch hash is valid"
        } else {
            "Tampering detected: hash mismatch!"
        };

        Ok(Json(VerifyResponse {
            valid: is_valid,
            message: msg.to_string(),
        }))
    } else {
        Err((StatusCode::NOT_FOUND, "Batch not found".to_string()))
    }
}

/// Mounts tracker-related routes.
pub fn tracker_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/tracker/add", post(add_batch))
        .route("/api/tracker/verify/:batch_id", get(verify_batch))
        .with_state(pool)
}
