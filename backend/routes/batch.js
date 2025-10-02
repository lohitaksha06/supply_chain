const express = require('express');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all batches (public, with pagination)
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const offset = (page - 1) * limit;
  const search = req.query.search || '';

  let query = `
    SELECT 
      mb.batch_id,
      mb.medicine_name,
      mb.manufacturer,
      mb.manufacturing_date,
      mb.expiry_date,
      mb.status,
      mb.created_at,
      c.name as company_name
    FROM medicine_batches mb
    JOIN companies c ON mb.company_id = c.id
  `;

  let params = [];
  if (search) {
    query += ` WHERE mb.medicine_name LIKE ? OR mb.batch_id LIKE ? OR mb.manufacturer LIKE ?`;
    params = [`%${search}%`, `%${search}%`, `%${search}%`];
  }

  query += ` ORDER BY mb.created_at DESC LIMIT ? OFFSET ?`;
  params.push(limit, offset);

  req.db.all(query, params, (err, batches) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to fetch batches' });
    }

    // Get total count
    let countQuery = 'SELECT COUNT(*) as total FROM medicine_batches mb';
    let countParams = [];
    
    if (search) {
      countQuery += ` WHERE mb.medicine_name LIKE ? OR mb.batch_id LIKE ? OR mb.manufacturer LIKE ?`;
      countParams = [`%${search}%`, `%${search}%`, `%${search}%`];
    }

    req.db.get(countQuery, countParams, (err, countResult) => {
      if (err) {
        console.error('Count error:', err);
        return res.status(500).json({ error: 'Failed to count batches' });
      }

      res.json({
        batches: batches || [],
        pagination: {
          current_page: page,
          total_pages: Math.ceil(countResult.total / limit),
          total_items: countResult.total,
          items_per_page: limit
        }
      });
    });
  });
});

// Get batches by status
router.get('/status/:status', (req, res) => {
  const { status } = req.params;
  const validStatuses = ['active', 'shipped', 'delivered', 'expired', 'recalled'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  req.db.all(
    `SELECT 
      mb.batch_id,
      mb.medicine_name,
      mb.manufacturer,
      mb.status,
      mb.created_at,
      c.name as company_name
     FROM medicine_batches mb
     JOIN companies c ON mb.company_id = c.id
     WHERE mb.status = ?
     ORDER BY mb.created_at DESC`,
    [status],
    (err, batches) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to fetch batches' });
      }

      res.json({
        batches: batches || [],
        status: status,
        total: batches ? batches.length : 0
      });
    }
  );
});

// Get batch statistics (public)
router.get('/stats', (req, res) => {
  req.db.all(
    `SELECT 
      COUNT(*) as total_batches,
      SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active_batches,
      SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) as shipped_batches,
      SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered_batches,
      SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) as expired_batches,
      SUM(CASE WHEN status = 'recalled' THEN 1 ELSE 0 END) as recalled_batches,
      COUNT(DISTINCT company_id) as total_companies,
      COUNT(DISTINCT medicine_name) as unique_medicines,
      SUM(quantity * batch_size) as total_medicines_produced
     FROM medicine_batches`,
    [],
    (err, stats) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to fetch statistics' });
      }

      res.json({
        statistics: stats[0] || {
          total_batches: 0,
          active_batches: 0,
          shipped_batches: 0,
          delivered_batches: 0,
          expired_batches: 0,
          recalled_batches: 0,
          total_companies: 0,
          unique_medicines: 0,
          total_medicines_produced: 0
        }
      });
    }
  );
});

module.exports = router;