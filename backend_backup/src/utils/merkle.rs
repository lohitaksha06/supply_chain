use sha2::{Digest, Sha256};

/// Hashes two strings together using SHA256
pub fn hash_pair(left: &str, right: &str) -> String {
    let combined = format!("{}{}", left, right);
    let mut hasher = Sha256::new();
    hasher.update(combined.as_bytes());
    format!("{:x}", hasher.finalize())
}

/// Builds a Merkle Root from a list of hashes
///
/// # Arguments
/// * `hashes` - A vector of SHA256 hash strings representing leaves
///
/// # Returns
/// * A string containing the Merkle Root of the tree
pub fn build_merkle_root(mut hashes: Vec<String>) -> String {
    if hashes.is_empty() {
        return "EMPTY_TREE".to_string();
    }

    while hashes.len() > 1 {
        let mut next_level = Vec::new();

        for i in (0..hashes.len()).step_by(2) {
            let left = &hashes[i];
            let right = if i + 1 < hashes.len() {
                &hashes[i + 1]
            } else {
                left // If odd number, duplicate the last
            };
            let parent = hash_pair(left, right);
            next_level.push(parent);
        }

        hashes = next_level;
    }

    hashes[0].clone()
}
