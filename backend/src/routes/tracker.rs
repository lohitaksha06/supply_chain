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
use crate::utils::merkle::build_merkle_root;
use crate::utils::signatures::{generate_keys, sign_data, verify_signature};

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
    pub previous_hash: String,
    pub signature: String,
    pub public_key: String,
}

#[derive(Serialize)]
pub struct VerifyResponse {
    pub valid: bool,
    pub message: String,
}

#[derive(Serialize)]
pub struct MerkleResponse {
    pub merkle_root: String,
    pub total_batches: usize,
}

async fn add_batch(
    State(pool): State<Arc<SqlitePool>>,
    Json(batch): Json<Batch>,
) -> Result<Json<TrackerResponse>, (StatusCode, String)> {
    let timestamp = Utc::now().to_rfc3339();

    let previous_hash: Option<String> = sqlx::query_scalar(
        "SELECT hash FROM medicine_batches ORDER BY timestamp DESC LIMIT 1"
    )
    .fetch_optional(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let previous_hash = previous_hash.unwrap_or_else(|| "GENESIS".to_string());

    let batch_hash = compute_batch_hash(
        &batch.batch_id,
        &batch.medicine_name,
        &batch.source,
        &batch.destination,
        &timestamp,
        &previous_hash,
    );

    let (private_key, public_key) = generate_keys();
    let signature_bytes = sign_data(&private_key, batch_hash.as_bytes());
    let signature_base64 = base64::encode(signature_bytes);
    let public_key_base64 = base64::encode(public_key.to_pkcs1_der().unwrap());

    sqlx::query(
        "INSERT INTO medicine_batches 
        (batch_id, medicine_name, source, destination, timestamp, hash, previous_hash, signature, public_key) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(&batch.batch_id)
    .bind(&batch.medicine_name)
    .bind(&batch.source)
    .bind(&batch.destination)
    .bind(&timestamp)
    .bind(&batch_hash)
    .bind(&previous_hash)
    .bind(&signature_base64)
    .bind(&public_key_base64)
    .execute(pool.as_ref())
    .await
    .map_err(|err| (StatusCode::INTERNAL_SERVER_ERROR, err.to_string()))?;

    Ok(Json(TrackerResponse {
        message: "Batch added with chained hash + signature + public key".to_string(),
        batch_hash,
        previous_hash,
        signature: signature_base64,
        public_key: public_key_base64,
    }))
}

async fn verify_batch(
    State(pool): State<Arc<SqlitePool>>,
    Path(batch_id): Path<String>,
) -> Result<Json<VerifyResponse>, (StatusCode, String)> {
    let row = sqlx::query!(
        "SELECT medicine_name, source, destination, timestamp, hash, previous_hash, signature, public_key
         FROM medicine_batches WHERE batch_id = ?",
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
            &batch.previous_hash,
        );

        let is_valid_hash = recomputed_hash == batch.hash;

        let is_signature_valid = if let (Some(sig_b64), Some(pubkey_b64)) = (batch.signature, batch.public_key) {
            let sig_bytes = base64::decode(sig_b64).unwrap_or_default();
            let pubkey_der = base64::decode(pubkey_b64).unwrap_or_default();
            let public_key = rsa::RsaPublicKey::from_pkcs1_der(&pubkey_der).unwrap_or_else(|_| {
                return rsa::RsaPublicKey::new(rsa::BigUint::default(), rsa::BigUint::default()).unwrap();
            });

            verify_signature(&public_key, recomputed_hash.as_bytes(), &sig_bytes)
        } else {
            false
        };

        let msg = if is_valid_hash && is_signature_valid {
            "Hash + signature both valid"
        } else if is_valid_hash {
            "Hash valid, but signature failed"
        } else {
            "Hash mismatch — possible tampering!"
        };

        Ok(Json(VerifyResponse {
            valid: is_valid_hash && is_signature_valid,
            message: msg.to_string(),
        }))
    } else {
        Err((StatusCode::NOT_FOUND, "Batch not found".to_string()))
    }
}

async fn verify_chain(
    State(pool): State<Arc<SqlitePool>>,
) -> Result<Json<VerifyResponse>, (StatusCode, String)> {
    let batches = sqlx::query!(
        "SELECT batch_id, medicine_name, source, destination, timestamp, hash, previous_hash 
         FROM medicine_batches ORDER BY timestamp ASC"
    )
    .fetch_all(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let mut expected_prev_hash = "GENESIS".to_string();

    for batch in batches {
        let recomputed_hash = compute_batch_hash(
            &batch.batch_id,
            &batch.medicine_name,
            &batch.source,
            &batch.destination,
            &batch.timestamp,
            &expected_prev_hash,
        );

        if recomputed_hash != batch.hash || batch.previous_hash != expected_prev_hash {
            return Ok(Json(VerifyResponse {
                valid: false,
                message: format!("Chain broken at batch ID: {}", batch.batch_id),
            }));
        }

        expected_prev_hash = batch.hash.clone();
    }

    Ok(Json(VerifyResponse {
        valid: true,
        message: "All batch hashes and chaining are valid.".to_string(),
    }))
}

async fn get_merkle_root(
    State(pool): State<Arc<SqlitePool>>,
) -> Result<Json<MerkleResponse>, (StatusCode, String)> {
    let hashes = sqlx::query_scalar("SELECT hash FROM medicine_batches ORDER BY timestamp ASC")
        .fetch_all(pool.as_ref())
        .await
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let root = build_merkle_root(hashes.clone());

    Ok(Json(MerkleResponse {
        merkle_root: root,
        total_batches: hashes.len(),
    }))
}

pub fn tracker_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/tracker/add", post(add_batch))
        .route("/api/tracker/verify/:batch_id", get(verify_batch))
        .route("/api/tracker/verifychain", get(verify_chain))
        .route("/api/tracker/merkleroot", get(get_merkle_root))
        .with_state(pool)
}
