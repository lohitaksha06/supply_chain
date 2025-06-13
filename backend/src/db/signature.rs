use rsa::{RsaPrivateKey, RsaPublicKey, PaddingScheme};
use rand::rngs::OsRng;
use sha2::{Sha256, Digest};

/// Generates RSA keys (demo purpose — you'd persist keys securely in production)
pub fn generate_keys() -> (RsaPrivateKey, RsaPublicKey) {
    let mut rng = OsRng;
    let private_key = RsaPrivateKey::new(&mut rng, 2048).expect("failed to generate a key");
    let public_key = RsaPublicKey::from(&private_key);
    (private_key, public_key)
}

/// Signs data (returns signature as Vec<u8>)
pub fn sign_data(private_key: &RsaPrivateKey, data: &[u8]) -> Vec<u8> {
    let hashed = Sha256::digest(data);
    private_key
        .sign(
            PaddingScheme::PKCS1v15Sign { hash: Some(rsa::Hash::SHA2_256) },
            &hashed,
        )
        .expect("failed to sign")
}

/// Verifies a signature (returns true if valid)
pub fn verify_signature(public_key: &RsaPublicKey, data: &[u8], signature: &[u8]) -> bool {
    let hashed = Sha256::digest(data);
    public_key
        .verify(
            PaddingScheme::PKCS1v15Sign { hash: Some(rsa::Hash::SHA2_256) },
            &hashed,
            signature,
        )
        .is_ok()
}
