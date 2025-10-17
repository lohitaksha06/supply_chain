use axum::{
    extract::{Json, Path, State},
    routing::{get, post},
    http::StatusCode,
    Router,
};
use serde::{Deserialize, Serialize};
use sqlx::{SqlitePool, Row};
use std::sync::Arc;
use chrono::Utc;

use crate::db::entities::{compute_batch_hash, generate_keys, sign_data, verify_signature};
use crate::utils::merkle::build_merkle_root;
use base64::{engine::general_purpose, Engine};
use rsa::pkcs1::{DecodeRsaPublicKey, EncodeRsaPublicKey};
use rsa::RsaPublicKey;

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

#[derive(Deserialize)]
pub struct VerifyRequest {
    pub batch_id: String,
}

#[derive(Serialize)]
pub struct MerkleResponse {
    pub merkle_root: String,
    pub total_batches: usize,
}

/// POST /api/tracker/add
/// Adds a new medicine batch with hash chaining + signature + public key
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

    // Generate RSA key pair and sign the batch hash
    let (private_key, public_key) = generate_keys();
    let signature_bytes = sign_data(&private_key, batch_hash.as_bytes());
    let signature_base64 = general_purpose::STANDARD.encode(&signature_bytes);
    let public_key_base64 = general_purpose::STANDARD.encode(public_key.to_pkcs1_der().unwrap().as_bytes());

    // Store batch record
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

/// GET /api/tracker/verify/:batch_id
/// Verifies hash and digital signature of a specific batch
async fn verify_batch(
    State(pool): State<Arc<SqlitePool>>,
    Path(batch_id): Path<String>,
) -> Result<Json<VerifyResponse>, (StatusCode, String)> {
    let row = sqlx::query(
        "SELECT medicine_name, source, destination, timestamp, hash, previous_hash, signature, public_key
         FROM medicine_batches WHERE batch_id = ?"
    )
    .bind(&batch_id)
    .fetch_optional(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Some(batch) = row {
        let medicine_name: String = batch.try_get("medicine_name").unwrap_or_default();
        let source: String = batch.try_get("source").unwrap_or_default();
        let destination: String = batch.try_get("destination").unwrap_or_default();
        let timestamp: String = batch.try_get("timestamp").unwrap_or_default();
        let previous_hash: String = batch.try_get("previous_hash").unwrap_or_default();
        let hash: String = batch.try_get("hash").unwrap_or_default();

        let recomputed_hash = compute_batch_hash(
            &batch_id,
            &medicine_name,
            &source,
            &destination,
            &timestamp,
            &previous_hash,
        );

    let is_valid_hash = recomputed_hash == hash;

    let is_signature_valid = if let (Some(sig_b64), Some(pubkey_b64)) = (batch.try_get::<Option<String>, _>("signature").ok().flatten(), batch.try_get::<Option<String>, _>("public_key").ok().flatten()) {
            let sig_bytes = general_purpose::STANDARD.decode(sig_b64).unwrap_or_default();
            let pubkey_der = general_purpose::STANDARD.decode(pubkey_b64).unwrap_or_default();
            if let Ok(public_key) = RsaPublicKey::from_pkcs1_der(&pubkey_der) {
                verify_signature(&public_key, recomputed_hash.as_bytes(), &sig_bytes)
            } else {
                false
            }
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

/// POST /verify
/// Body: { batch_id }
/// Mirrors verify_batch but accepts JSON and returns VerifyResponse
async fn verify_batch_post(
    State(pool): State<Arc<SqlitePool>>,
    Json(payload): Json<VerifyRequest>,
) -> Result<Json<VerifyResponse>, (StatusCode, String)> {
    let row = sqlx::query(
        "SELECT medicine_name, source, destination, timestamp, hash, previous_hash, signature, public_key
         FROM medicine_batches WHERE batch_id = ?"
    )
    .bind(&payload.batch_id)
    .fetch_optional(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Some(batch) = row {
        let medicine_name: String = batch.try_get("medicine_name").unwrap_or_default();
        let source: String = batch.try_get("source").unwrap_or_default();
        let destination: String = batch.try_get("destination").unwrap_or_default();
        let timestamp: String = batch.try_get("timestamp").unwrap_or_default();
        let previous_hash: String = batch.try_get("previous_hash").unwrap_or_default();
        let hash: String = batch.try_get("hash").unwrap_or_default();

        let recomputed_hash = compute_batch_hash(
            &payload.batch_id,
            &medicine_name,
            &source,
            &destination,
            &timestamp,
            &previous_hash,
        );

        let is_valid_hash = recomputed_hash == hash;

        let is_signature_valid = if let (Some(sig_b64), Some(pubkey_b64)) = (batch.try_get::<Option<String>, _>("signature").ok().flatten(), batch.try_get::<Option<String>, _>("public_key").ok().flatten()) {
            let sig_bytes = general_purpose::STANDARD.decode(sig_b64).unwrap_or_default();
            let pubkey_der = general_purpose::STANDARD.decode(pubkey_b64).unwrap_or_default();
            if let Ok(public_key) = RsaPublicKey::from_pkcs1_der(&pubkey_der) {
                verify_signature(&public_key, recomputed_hash.as_bytes(), &sig_bytes)
            } else {
                false
            }
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

        Ok(Json(VerifyResponse { valid: is_valid_hash && is_signature_valid, message: msg.to_string() }))
    } else {
        Err((StatusCode::NOT_FOUND, "Batch not found".to_string()))
    }
}

#[derive(Deserialize)]
pub struct TrackRequest { pub batch_id: String }

/// POST /track
/// Body: { batch_id }
/// Returns chain/crypto details for a batch so the frontend can display them
async fn track_batch_post(
    State(pool): State<Arc<SqlitePool>>,
    Json(payload): Json<TrackRequest>,
) -> Result<Json<TrackerResponse>, (StatusCode, String)> {
    let row = sqlx::query(
        "SELECT hash, previous_hash, signature, public_key
         FROM medicine_batches WHERE batch_id = ?"
    )
    .bind(&payload.batch_id)
    .fetch_optional(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Some(batch) = row {
        let batch_hash: String = batch.try_get("hash").unwrap_or_default();
        let previous_hash: String = batch.try_get("previous_hash").unwrap_or_default();
        let signature: String = batch.try_get("signature").unwrap_or_default();
        let public_key: String = batch.try_get("public_key").unwrap_or_default();

        Ok(Json(TrackerResponse {
            message: format!("Tracking info for batch {}", payload.batch_id),
            batch_hash,
            previous_hash,
            signature,
            public_key,
        }))
    } else {
        Err((StatusCode::NOT_FOUND, "Batch not found".to_string()))
    }
}

/// GET /api/tracker/verifychain
/// Verifies full hash chain integrity
async fn verify_chain(
    State(pool): State<Arc<SqlitePool>>,
) -> Result<Json<VerifyResponse>, (StatusCode, String)> {
    let batches = sqlx::query(
        "SELECT batch_id, medicine_name, source, destination, timestamp, hash, previous_hash 
         FROM medicine_batches ORDER BY timestamp ASC"
    )
    .fetch_all(pool.as_ref())
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    let mut expected_prev_hash = "GENESIS".to_string();

    for row in batches {
        let batch_id: String = row.try_get("batch_id").unwrap_or_default();
        let medicine_name: String = row.try_get("medicine_name").unwrap_or_default();
        let source: String = row.try_get("source").unwrap_or_default();
        let destination: String = row.try_get("destination").unwrap_or_default();
        let timestamp: String = row.try_get("timestamp").unwrap_or_default();
        let hash: String = row.try_get("hash").unwrap_or_default();
        let previous_hash: String = row.try_get("previous_hash").unwrap_or_default();
        let recomputed_hash = compute_batch_hash(
            &batch_id,
            &medicine_name,
            &source,
            &destination,
            &timestamp,
            &expected_prev_hash,
        );

        if recomputed_hash != hash || previous_hash != expected_prev_hash {
            return Ok(Json(VerifyResponse {
                valid: false,
                message: format!("Chain broken at batch ID: {}", batch_id),
            }));
        }

        expected_prev_hash = hash.clone();
    }

    Ok(Json(VerifyResponse {
        valid: true,
        message: "All batch hashes and chaining are valid.".to_string(),
    }))
}

/// GET /api/tracker/merkleroot
/// Computes and returns the Merkle root of all batch hashes
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

/// Mounts all tracker routes
pub fn tracker_routes(pool: Arc<SqlitePool>) -> Router {
    Router::new()
        .route("/api/tracker/add", post(add_batch))
        .route("/api/tracker/verify/:batch_id", get(verify_batch))
        .route("/api/tracker/verifychain", get(verify_chain))
        .route("/api/tracker/merkleroot", get(get_merkle_root))
        // Compatibility routes expected by frontend
        .route("/verify", post(verify_batch_post))
        .route("/track", post(track_batch_post))
        .with_state(pool)
}
