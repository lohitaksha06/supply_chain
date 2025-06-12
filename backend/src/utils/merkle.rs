use sha2::{Sha256, Digest};

pub fn hash_pair(left: &str, right: &str) -> String {
    let combined = format!("{}{}", left, right);
    let mut hasher = Sha256::new();
    hasher.update(combined.as_bytes());
    format!("{:x}", hasher.finalize())
}

pub fn build_merkle_root(mut hashes: Vec<String>) -> String {
    if hashes.is_empty() {
        return "EMPTY".to_string();
    }

    while hashes.len() > 1 {
        let mut next_level = vec![];

        for i in (0..hashes.len()).step_by(2) {
            let left = &hashes[i];
            let right = if i + 1 < hashes.len() {
                &hashes[i + 1]
            } else {
                left
            };
            next_level.push(hash_pair(left, right));
        }

        hashes = next_level;
    }

    hashes[0].clone()
}
