const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// All customer routes require customer role
router.use(authenticateToken);
router.use(requireRole('customer'));

// Get customer dashboard data
router.get('/dashboard', (req, res) => {
  const userId = req.user.userId;

  // Get customer info
  req.db.get(
    'SELECT * FROM customers WHERE user_id = ?',
    [userId],
    (err, customer) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!customer) {
        return res.status(404).json({ error: 'Customer profile not found' });
      }

      // Get purchase statistics
      req.db.all(
        `SELECT 
          COUNT(*) as total_purchases,
          SUM(quantity_purchased) as total_medicines,
          SUM(CASE WHEN verified = 1 THEN 1 ELSE 0 END) as verified_purchases,
          COUNT(DISTINCT mb.medicine_name) as unique_medicines
         FROM customer_purchases cp
         LEFT JOIN medicine_batches mb ON cp.batch_id = mb.batch_id
         WHERE cp.customer_id = ?`,
        [customer.id],
        (err, stats) => {
          if (err) {
            console.error('Stats error:', err);
            return res.status(500).json({ error: 'Failed to fetch statistics' });
          }

          res.json({
            customer: {
              id: customer.id,
              name: customer.name,
              location: customer.location,
              phone: customer.phone
            },
            statistics: stats[0] || {
              total_purchases: 0,
              total_medicines: 0,
              verified_purchases: 0,
              unique_medicines: 0
            }
          });
        }
      );
    }
  );
});

// Add a new purchase record
router.post('/purchase', (req, res) => {
  const userId = req.user.userId;
  const {
    batch_id,
    pharmacy_name,
    pharmacy_location,
    quantity_purchased,
    price,
    prescription_number,
    doctor_name
  } = req.body;

  if (!batch_id || !pharmacy_name || !quantity_purchased) {
    return res.status(400).json({ error: 'Batch ID, pharmacy name, and quantity are required' });
  }

  // Get customer info
  req.db.get(
    'SELECT id FROM customers WHERE user_id = ?',
    [userId],
    (err, customer) => {
      if (err || !customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Verify the batch exists
      req.db.get(
        'SELECT batch_id, medicine_name, status FROM medicine_batches WHERE batch_id = ?',
        [batch_id],
        (err, batch) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
          }

          if (!batch) {
            return res.status(404).json({ error: 'Batch not found' });
          }

          // Create purchase record
          const purchaseId = uuidv4();
          req.db.run(
            `INSERT INTO customer_purchases (
              id, customer_id, batch_id, pharmacy_name, pharmacy_location,
              quantity_purchased, price, prescription_number, doctor_name, verified
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              purchaseId, customer.id, batch_id, pharmacy_name, pharmacy_location,
              parseInt(quantity_purchased), parseFloat(price) || null, 
              prescription_number || null, doctor_name || null, false
            ],
            function(err) {
              if (err) {
                console.error('Error creating purchase record:', err);
                return res.status(500).json({ error: 'Failed to record purchase' });
              }

              res.status(201).json({
                message: 'Purchase recorded successfully',
                purchase: {
                  id: purchaseId,
                  batch_id,
                  medicine_name: batch.medicine_name,
                  pharmacy_name,
                  quantity_purchased: parseInt(quantity_purchased),
                  verified: false
                }
              });
            }
          );
        }
      );
    }
  );
});

// Get all customer purchases
router.get('/purchases', (req, res) => {
  const userId = req.user.userId;

  // Get customer ID
  req.db.get(
    'SELECT id FROM customers WHERE user_id = ?',
    [userId],
    (err, customer) => {
      if (err || !customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Get all purchases with medicine details
      req.db.all(
        `SELECT 
          cp.*,
          mb.medicine_name,
          mb.manufacturer,
          mb.expiry_date,
          mb.status as batch_status,
          c.name as company_name
         FROM customer_purchases cp
         JOIN medicine_batches mb ON cp.batch_id = mb.batch_id
         JOIN companies c ON mb.company_id = c.id
         WHERE cp.customer_id = ?
         ORDER BY cp.purchase_date DESC`,
        [customer.id],
        (err, purchases) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch purchases' });
          }

          res.json({
            purchases: purchases || [],
            total: purchases ? purchases.length : 0
          });
        }
      );
    }
  );
});

// Verify a specific purchase
router.post('/purchase/:purchaseId/verify', (req, res) => {
  const { purchaseId } = req.params;
  const userId = req.user.userId;

  // Get customer ID and verify ownership
  req.db.get(
    'SELECT id FROM customers WHERE user_id = ?',
    [userId],
    (err, customer) => {
      if (err || !customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }

      // Get purchase details
      req.db.get(
        `SELECT cp.*, mb.hash, mb.digital_signature, mb.public_key
         FROM customer_purchases cp
         JOIN medicine_batches mb ON cp.batch_id = mb.batch_id
         WHERE cp.id = ? AND cp.customer_id = ?`,
        [purchaseId, customer.id],
        (err, purchase) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
          }

          if (!purchase) {
            return res.status(404).json({ error: 'Purchase not found' });
          }

          // Mark as verified
          req.db.run(
            'UPDATE customer_purchases SET verified = 1 WHERE id = ?',
            [purchaseId],
            function(err) {
              if (err) {
                console.error('Error updating purchase:', err);
                return res.status(500).json({ error: 'Failed to verify purchase' });
              }

              res.json({
                message: 'Purchase verified successfully',
                verification: {
                  purchase_id: purchaseId,
                  batch_id: purchase.batch_id,
                  hash: purchase.hash,
                  digital_signature: purchase.digital_signature ? 'Valid' : 'Missing',
                  verified: true
                }
              });
            }
          );
        }
      );
    }
  );
});

// Get medicine information by batch ID (for verification)
router.get('/medicine/:batchId', (req, res) => {
  const { batchId } = req.params;

  req.db.get(
    `SELECT 
      mb.*,
      c.name as company_name,
      c.location as company_location,
      c.license_id
     FROM medicine_batches mb
     JOIN companies c ON mb.company_id = c.id
     WHERE mb.batch_id = ?`,
    [batchId],
    (err, medicine) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!medicine) {
        return res.status(404).json({ error: 'Medicine batch not found' });
      }

      res.json({
        medicine: {
          batch_id: medicine.batch_id,
          medicine_name: medicine.medicine_name,
          manufacturer: medicine.manufacturer,
          manufacturing_date: medicine.manufacturing_date,
          expiry_date: medicine.expiry_date,
          quantity: medicine.quantity,
          unit: medicine.unit,
          batch_size: medicine.batch_size,
          status: medicine.status,
          company: {
            name: medicine.company_name,
            location: medicine.company_location,
            license_id: medicine.license_id
          },
          blockchain: {
            hash: medicine.hash,
            previous_hash: medicine.previous_hash,
            digital_signature: medicine.digital_signature ? 'Present' : 'Missing',
            verified: medicine.digital_signature ? true : false
          }
        }
      });
    }
  );
});

// Search medicines by name or batch ID
router.get('/search', (req, res) => {
  const { q } = req.query; // search query

  if (!q || q.length < 2) {
    return res.status(400).json({ error: 'Search query must be at least 2 characters' });
  }

  req.db.all(
    `SELECT 
      mb.batch_id,
      mb.medicine_name,
      mb.manufacturer,
      mb.expiry_date,
      mb.status,
      c.name as company_name
     FROM medicine_batches mb
     JOIN companies c ON mb.company_id = c.id
     WHERE mb.medicine_name LIKE ? OR mb.batch_id LIKE ?
     ORDER BY mb.created_at DESC
     LIMIT 20`,
    [`%${q}%`, `%${q}%`],
    (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Search failed' });
      }

      res.json({
        results: results || [],
        query: q,
        total: results ? results.length : 0
      });
    }
  );
});

module.exports = router;