const crypto = require('crypto');
const NodeRSA = require('node-rsa');

// Generate SHA-256 hash for batch data
function generateBatchHash(batchData, previousHash = 'GENESIS') {
  const dataString = JSON.stringify({
    batch_id: batchData.batch_id,
    medicine_name: batchData.medicine_name,
    manufacturer: batchData.manufacturer,
    manufacturing_date: batchData.manufacturing_date,
    expiry_date: batchData.expiry_date,
    quantity: batchData.quantity,
    previous_hash: previousHash,
    timestamp: new Date().toISOString()
  });

  return crypto.createHash('sha256').update(dataString).digest('hex');
}

// Generate RSA key pair for digital signatures
function generateRSAKeyPair() {
  const key = new NodeRSA({ b: 2048 });
  
  return {
    privateKey: key.exportKey('private'),
    publicKey: key.exportKey('public')
  };
}

// Sign data with RSA private key
function signData(data, privateKey) {
  const key = new NodeRSA(privateKey);
  return key.sign(data, 'base64');
}

// Verify signature with RSA public key
function verifySignature(data, signature, publicKey) {
  try {
    const key = new NodeRSA(publicKey);
    return key.verify(data, signature, 'utf8', 'base64');
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
}

// Generate Merkle root for batch grouping
function generateMerkleRoot(hashes) {
  if (hashes.length === 0) return null;
  if (hashes.length === 1) return hashes[0];

  const newLevel = [];
  for (let i = 0; i < hashes.length; i += 2) {
    const left = hashes[i];
    const right = hashes[i + 1] || left; // If odd number, duplicate last hash
    const combined = crypto.createHash('sha256').update(left + right).digest('hex');
    newLevel.push(combined);
  }

  return generateMerkleRoot(newLevel);
}

// Validate batch hash chain
function validateHashChain(currentBatch, previousBatch) {
  if (!previousBatch && currentBatch.previous_hash !== 'GENESIS') {
    return false;
  }

  if (previousBatch && currentBatch.previous_hash !== previousBatch.hash) {
    return false;
  }

  // Recreate hash and compare
  const expectedHash = generateBatchHash(currentBatch, currentBatch.previous_hash);
  return expectedHash === currentBatch.hash;
}

// Generate unique batch ID
function generateBatchId(companyPrefix = 'BATCH') {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `${companyPrefix}-${timestamp}-${random}`;
}

module.exports = {
  generateBatchHash,
  generateRSAKeyPair,
  signData,
  verifySignature,
  generateMerkleRoot,
  validateHashChain,
  generateBatchId
};