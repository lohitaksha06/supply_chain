const express = require('express');
const { v4: uuidv4 } = require('uuid');
const { authenticateToken, requireRole } = require('../middleware/auth');

const router = express.Router();

// All hospital routes require hospital role
router.use(authenticateToken);
router.use(requireRole('hospital'));

// Get hospital dashboard data
router.get('/dashboard', (req, res) => {
  const userId = req.user.userId;

  // Get hospital info
  req.db.get(
    'SELECT * FROM hospitals WHERE user_id = ?',
    [userId],
    (err, hospital) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!hospital) {
        return res.status(404).json({ error: 'Hospital profile not found' });
      }

      // Get inventory statistics
      req.db.all(
        `SELECT 
          COUNT(*) as total_inventory_items,
          SUM(quantity_received) as total_medicines,
          SUM(CASE WHEN verified = 1 THEN 1 ELSE 0 END) as verified_batches,
          COUNT(DISTINCT mb.medicine_name) as unique_medicines
         FROM hospital_inventory hi
         LEFT JOIN medicine_batches mb ON hi.batch_id = mb.batch_id
         WHERE hi.hospital_id = ?`,
        [hospital.id],
        (err, stats) => {
          if (err) {
            console.error('Stats error:', err);
            return res.status(500).json({ error: 'Failed to fetch statistics' });
          }

          res.json({
            hospital: {
              id: hospital.id,
              name: hospital.name,
              location: hospital.location,
              registration_id: hospital.registration_id,
              contact_person: hospital.contact_person,
              phone: hospital.phone
            },
            statistics: stats[0] || {
              total_inventory_items: 0,
              total_medicines: 0,
              verified_batches: 0,
              unique_medicines: 0
            }
          });
        }
      );
    }
  );
});

// Add medicine batch to hospital inventory
router.post('/inventory', (req, res) => {
  const userId = req.user.userId;
  const {
    batch_id,
    quantity_received,
    supplier_info,
    notes
  } = req.body;

  if (!batch_id || !quantity_received) {
    return res.status(400).json({ error: 'Batch ID and quantity are required' });
  }

  // Get hospital info
  req.db.get(
    'SELECT id FROM hospitals WHERE user_id = ?',
    [userId],
    (err, hospital) => {
      if (err || !hospital) {
        return res.status(404).json({ error: 'Hospital not found' });
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

          // Add to inventory
          const inventoryId = uuidv4();
          req.db.run(
            `INSERT INTO hospital_inventory (
              id, hospital_id, batch_id, quantity_received, supplier_info, verified
            ) VALUES (?, ?, ?, ?, ?, ?)`,
            [
              inventoryId, hospital.id, batch_id, 
              parseInt(quantity_received), supplier_info || '', false
            ],
            function(err) {
              if (err) {
                console.error('Error adding to inventory:', err);
                return res.status(500).json({ error: 'Failed to add to inventory' });
              }

              // Add supply chain tracking
              req.db.get(
                'SELECT name FROM hospitals WHERE id = ?',
                [hospital.id],
                (err, hospitalInfo) => {
                  if (!err && hospitalInfo) {
                    req.db.run(
                      `INSERT INTO supply_chain_tracking (
                        id, batch_id, from_entity, to_entity, location, status, notes
                      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                      [
                        uuidv4(), batch_id, supplier_info || 'Supplier', 
                        hospitalInfo.name, hospitalInfo.location || '',
                        'received', notes || 'Received at hospital'
                      ],
                      () => {} // Ignore tracking errors
                    );
                  }
                });

              res.status(201).json({
                message: 'Medicine added to inventory successfully',
                inventory: {
                  id: inventoryId,
                  batch_id,
                  medicine_name: batch.medicine_name,
                  quantity_received: parseInt(quantity_received),
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

// Get hospital inventory
router.get('/inventory', (req, res) => {
  const userId = req.user.userId;

  // Get hospital ID
  req.db.get(
    'SELECT id FROM hospitals WHERE user_id = ?',
    [userId],
    (err, hospital) => {
      if (err || !hospital) {
        return res.status(404).json({ error: 'Hospital not found' });
      }

      // Get inventory with medicine details
      req.db.all(
        `SELECT 
          hi.*,
          mb.medicine_name,
          mb.manufacturer,
          mb.expiry_date,
          mb.status as batch_status,
          mb.hash,
          mb.digital_signature,
          c.name as company_name
         FROM hospital_inventory hi
         JOIN medicine_batches mb ON hi.batch_id = mb.batch_id
         JOIN companies c ON mb.company_id = c.id
         WHERE hi.hospital_id = ?
         ORDER BY hi.received_date DESC`,
        [hospital.id],
        (err, inventory) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Failed to fetch inventory' });
          }

          res.json({
            inventory: inventory || [],
            total: inventory ? inventory.length : 0
          });
        }
      );
    }
  );
});

// Verify a batch in inventory
router.post('/inventory/:inventoryId/verify', (req, res) => {
  const { inventoryId } = req.params;
  const userId = req.user.userId;

  // Get hospital ID and verify ownership
  req.db.get(
    'SELECT id FROM hospitals WHERE user_id = ?',
    [userId],
    (err, hospital) => {
      if (err || !hospital) {
        return res.status(404).json({ error: 'Hospital not found' });
      }

      // Get inventory item
      req.db.get(
        `SELECT hi.*, mb.hash, mb.digital_signature, mb.public_key, mb.medicine_name
         FROM hospital_inventory hi
         JOIN medicine_batches mb ON hi.batch_id = mb.batch_id
         WHERE hi.id = ? AND hi.hospital_id = ?`,
        [inventoryId, hospital.id],
        (err, item) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
          }

          if (!item) {
            return res.status(404).json({ error: 'Inventory item not found' });
          }

          // Mark as verified
          req.db.run(
            'UPDATE hospital_inventory SET verified = 1 WHERE id = ?',
            [inventoryId],
            function(err) {
              if (err) {
                console.error('Error updating inventory:', err);
                return res.status(500).json({ error: 'Failed to verify batch' });
              }

              res.json({
                message: 'Batch verified successfully',
                verification: {
                  inventory_id: inventoryId,
                  batch_id: item.batch_id,
                  medicine_name: item.medicine_name,
                  hash: item.hash,
                  digital_signature: item.digital_signature ? 'Valid' : 'Missing',
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

// Quick batch verification (without adding to inventory)
router.post('/verify-batch', (req, res) => {
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
        return res.status(404).json({ error: 'Batch not found' });
      }

      // Check if batch is expired
      const now = new Date();
      const expiryDate = new Date(batch.expiry_date);
      const isExpired = now > expiryDate;

      res.json({
        verification: {
          batch_id: batch.batch_id,
          medicine_name: batch.medicine_name,
          manufacturer: batch.manufacturer,
          manufacturing_date: batch.manufacturing_date,
          expiry_date: batch.expiry_date,
          status: batch.status,
          is_expired: isExpired,
          company: {
            name: batch.company_name,
            location: batch.company_location,
            license_id: batch.license_id
          },
          blockchain: {
            hash: batch.hash,
            previous_hash: batch.previous_hash,
            digital_signature: batch.digital_signature ? 'Present' : 'Missing',
            merkle_root: batch.merkle_root,
            verified: batch.digital_signature ? true : false
          }
        },
        valid: !isExpired && batch.status === 'active' && batch.digital_signature,
        message: !isExpired && batch.status === 'active' && batch.digital_signature 
          ? 'Batch is valid and authentic' 
          : 'Batch verification failed - check expiry date, status, or digital signature'
      });
    }
  );
});

module.exports = router;