use axum::{extract::{Path, State}, Json};
use sqlx::SqlitePool;
use rsa::{RsaPublicKey, PaddingScheme, pkcs1::DecodeRsaPublicKey};
use sha2::{Sha256, Digest};
use base64::decode;
use std::sync::Arc;

use crate::db::entities::compute_batch_hash;

#[derive(serde::Serialize)]
pub struct SignatureVerifyResponse {
    pub valid: bool,
    pub message: String,
}

pub async fn verify_signature_handler(
    State(pool): State<Arc<SqlitePool>>,
    Path(batch_id): Path<String>,
) -> Result<Json<SignatureVerifyResponse>, (axum::http::StatusCode, String)> {
    let row = sqlx::query!(
        "SELECT medicine_name, source, destination, timestamp, previous_hash, hash, signature, public_key 
         FROM medicine_batches WHERE batch_id = ?",
        batch_id
    )
    .fetch_optional(pool.as_ref())
    .await
    .map_err(|e| (axum::http::StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

    if let Some(batch) = row {
        let recomputed_hash = compute_batch_hash(
            &batch_id,
            &batch.medicine_name,
            &batch.source,
            &batch.destination,
            &batch.timestamp,
            &batch.previous_hash,
        );

        let signature = batch.signature.ok_or_else(|| {
            (axum::http::StatusCode::BAD_REQUEST, "Missing signature".to_string())
        })?;
        let public_key_encoded = batch.public_key.ok_or_else(|| {
            (axum::http::StatusCode::BAD_REQUEST, "Missing public key".to_string())
        })?;

        let signature_bytes = decode(signature).map_err(|_| {
            (axum::http::StatusCode::BAD_REQUEST, "Invalid signature base64".to_string())
        })?;

        let public_key_der = decode(public_key_encoded).map_err(|_| {
            (axum::http::StatusCode::BAD_REQUEST, "Invalid public key base64".to_string())
        })?;

        let public_key = RsaPublicKey::from_pkcs1_der(&public_key_der).map_err(|_| {
            (axum::http::StatusCode::BAD_REQUEST, "Failed to decode public key".to_string())
        })?;

        let valid = public_key.verify(
            PaddingScheme::PKCS1v15Sign { hash: Some(rsa::Hash::SHA2_256) },
            &Sha256::digest(recomputed_hash.as_bytes()),
            &signature_bytes,
        ).is_ok();

        Ok(Json(SignatureVerifyResponse {
            valid,
            message: if valid {
                "Signature is valid ✅".to_string()
            } else {
                "Signature is invalid ❌".to_string()
            },
        }))
    } else {
        Err((axum::http::StatusCode::NOT_FOUND, "Batch not found".to_string()))
    }
}
