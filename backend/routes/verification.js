const express = require('express');
const { verifySignature, validateHashChain } = require('../utils/blockchain');

const router = express.Router();

// Public batch verification endpoint
router.post('/verify', (req, res) => {
  const { batch_id } = req.body;

  if (!batch_id) {
    return res.status(400).json({ error: 'Batch ID is required' });
  }

  req.db.get(
    `SELECT 
      mb.*,
      c.name as company_name,
      c.location as company_location,
      c.license_id
     FROM medicine_batches mb
     JOIN companies c ON mb.company_id = c.id
     WHERE mb.batch_id = ?`,
    [batch_id],
    (err, batch) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!batch) {
        return res.status(404).json({ 
          valid: false,
          error: 'Batch not found',
          message: 'The provided batch ID does not exist in our system'
        });
      }

      // Check digital signature
      let signatureValid = false;
      if (batch.digital_signature && batch.public_key) {
        signatureValid = verifySignature(batch.hash, batch.digital_signature, batch.public_key);
      }

      // Check if expired
      const now = new Date();
      const expiryDate = new Date(batch.expiry_date);
      const isExpired = now > expiryDate;

      // Verify hash chain
      req.db.get(
        'SELECT hash FROM medicine_batches WHERE created_at < ? ORDER BY created_at DESC LIMIT 1',
        [batch.created_at],
        (err, previousBatch) => {
          let hashChainValid = true;
          if (!err) {
            hashChainValid = validateHashChain(batch, previousBatch);
          }

          const isValid = signatureValid && !isExpired && batch.status === 'active' && hashChainValid;

          res.json({
            valid: isValid,
            batch: {
              batch_id: batch.batch_id,
              medicine_name: batch.medicine_name,
              manufacturer: batch.manufacturer,
              manufacturing_date: batch.manufacturing_date,
              expiry_date: batch.expiry_date,
              status: batch.status,
              company: {
                name: batch.company_name,
                location: batch.company_location,
                license_id: batch.license_id
              }
            },
            verification_details: {
              digital_signature_valid: signatureValid,
              hash_chain_valid: hashChainValid,
              not_expired: !isExpired,
              status_active: batch.status === 'active'
            },
            message: isValid 
              ? 'Batch is authentic and verified' 
              : 'Batch verification failed - please check the details'
          });
        }
      );
    }
  );
});

// Track batch supply chain
router.post('/track', (req, res) => {
  const { batch_id } = req.body;

  if (!batch_id) {
    return res.status(400).json({ error: 'Batch ID is required' });
  }

  // Get batch details
  req.db.get(
    `SELECT 
      mb.*,
      c.name as company_name
     FROM medicine_batches mb
     JOIN companies c ON mb.company_id = c.id
     WHERE mb.batch_id = ?`,
    [batch_id],
    (err, batch) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }

      // Get supply chain tracking
      req.db.all(
        `SELECT * FROM supply_chain_tracking 
         WHERE batch_id = ? 
         ORDER BY timestamp ASC`,
        [batch_id],
        (err, tracking) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch tracking data' });
          }

          res.json({
            batch: {
              batch_id: batch.batch_id,
              medicine_name: batch.medicine_name,
              manufacturer: batch.manufacturer,
              status: batch.status,
              company: batch.company_name
            },
            supply_chain: tracking || [],
            blockchain: {
              hash: batch.hash,
              previous_hash: batch.previous_hash,
              digital_signature: batch.digital_signature ? 'Present' : 'Missing',
              merkle_root: batch.merkle_root
            },
            message: 'Supply chain tracking retrieved successfully'
          });
        }
      );
    }
  );
});

// Verify blockchain chain integrity
router.post('/verifychain', (req, res) => {
  const { batch_id } = req.body;

  if (!batch_id) {
    return res.status(400).json({ error: 'Batch ID is required' });
  }

  req.db.get(
    'SELECT * FROM medicine_batches WHERE batch_id = ?',
    [batch_id],
    (err, batch) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }

      // Get previous batch for chain validation
      req.db.get(
        'SELECT * FROM medicine_batches WHERE created_at < ? ORDER BY created_at DESC LIMIT 1',
        [batch.created_at],
        (err, previousBatch) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
          }

          const chainValid = validateHashChain(batch, previousBatch);
          
          let signatureValid = false;
          if (batch.digital_signature && batch.public_key) {
            signatureValid = verifySignature(batch.hash, batch.digital_signature, batch.public_key);
          }

          res.json({
            batch_id: batch.batch_id,
            chain_valid: chainValid,
            signature_valid: signatureValid,
            hash: batch.hash,
            previous_hash: batch.previous_hash,
            digital_signature: batch.digital_signature ? 'Present' : 'Missing',
            verification_result: chainValid && signatureValid ? 'VALID' : 'INVALID',
            message: chainValid && signatureValid 
              ? 'Blockchain chain integrity verified' 
              : 'Chain integrity verification failed'
          });
        }
      );
    }
  );
});

// Get batch details (public endpoint)
router.get('/batch/:batchId', (req, res) => {
  const { batchId } = req.params;

  req.db.get(
    `SELECT 
      mb.*,
      c.name as company_name,
      c.location as company_location,
      c.license_id,
      c.contact_person
     FROM medicine_batches mb
     JOIN companies c ON mb.company_id = c.id
     WHERE mb.batch_id = ?`,
    [batchId],
    (err, batch) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!batch) {
        return res.status(404).json({ error: 'Batch not found' });
      }

      res.json({
        batch: {
          batch_id: batch.batch_id,
          medicine_name: batch.medicine_name,
          manufacturer: batch.manufacturer,
          manufacturing_date: batch.manufacturing_date,
          expiry_date: batch.expiry_date,
          quantity: batch.quantity,
          unit: batch.unit,
          batch_size: batch.batch_size,
          description: batch.description,
          status: batch.status,
          created_at: batch.created_at
        },
        company: {
          name: batch.company_name,
          location: batch.company_location,
          license_id: batch.license_id,
          contact_person: batch.contact_person
        },
        blockchain: {
          hash: batch.hash,
          previous_hash: batch.previous_hash,
          merkle_root: batch.merkle_root,
          digital_signature: batch.digital_signature ? 'Present' : 'Missing'
        }
      });
    }
  );
});

module.exports = router;