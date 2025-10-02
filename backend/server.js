const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const companyRoutes = require('./routes/company');
const hospitalRoutes = require('./routes/hospital');
const customerRoutes = require('./routes/customer');
const batchRoutes = require('./routes/batch');
const verificationRoutes = require('./routes/verification');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Database
const dbPath = path.join(__dirname, 'pharmachain.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    initializeTables();
  }
});

// Initialize database tables
function initializeTables() {
  // Users table for authentication
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('company', 'hospital', 'customer')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Companies table
  db.run(`
    CREATE TABLE IF NOT EXISTS companies (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      license_id TEXT UNIQUE NOT NULL,
      contact_person TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Hospitals table
  db.run(`
    CREATE TABLE IF NOT EXISTS hospitals (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      registration_id TEXT UNIQUE NOT NULL,
      contact_person TEXT,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Customers table
  db.run(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      location TEXT NOT NULL,
      phone TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `);

  // Medicine batches table with blockchain features
  db.run(`
    CREATE TABLE IF NOT EXISTS medicine_batches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      batch_id TEXT UNIQUE NOT NULL,
      medicine_name TEXT NOT NULL,
      company_id TEXT NOT NULL,
      manufacturer TEXT NOT NULL,
      manufacturing_date DATE NOT NULL,
      expiry_date DATE NOT NULL,
      quantity INTEGER NOT NULL,
      unit TEXT NOT NULL DEFAULT 'tablets',
      batch_size INTEGER NOT NULL,
      description TEXT,
      hash TEXT NOT NULL,
      previous_hash TEXT NOT NULL,
      merkle_root TEXT,
      digital_signature TEXT,
      public_key TEXT,
      status TEXT DEFAULT 'active' CHECK (status IN ('active', 'shipped', 'delivered', 'expired', 'recalled')),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (company_id) REFERENCES companies (id)
    )
  `);

  // Customer purchases table - NEW FEATURE for customers to track their medicines
  db.run(`
    CREATE TABLE IF NOT EXISTS customer_purchases (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL,
      batch_id TEXT NOT NULL,
      purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      pharmacy_name TEXT,
      pharmacy_location TEXT,
      quantity_purchased INTEGER NOT NULL,
      price DECIMAL(10,2),
      prescription_number TEXT,
      doctor_name TEXT,
      verified BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (customer_id) REFERENCES customers (id),
      FOREIGN KEY (batch_id) REFERENCES medicine_batches (batch_id)
    )
  `);

  // Hospital inventory table
  db.run(`
    CREATE TABLE IF NOT EXISTS hospital_inventory (
      id TEXT PRIMARY KEY,
      hospital_id TEXT NOT NULL,
      batch_id TEXT NOT NULL,
      received_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      quantity_received INTEGER NOT NULL,
      supplier_info TEXT,
      verified BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (hospital_id) REFERENCES hospitals (id),
      FOREIGN KEY (batch_id) REFERENCES medicine_batches (batch_id)
    )
  `);

  // Supply chain tracking table
  db.run(`
    CREATE TABLE IF NOT EXISTS supply_chain_tracking (
      id TEXT PRIMARY KEY,
      batch_id TEXT NOT NULL,
      from_entity TEXT NOT NULL,
      to_entity TEXT NOT NULL,
      location TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT NOT NULL,
      notes TEXT,
      FOREIGN KEY (batch_id) REFERENCES medicine_batches (batch_id)
    )
  `);

  console.log('✅ Database tables initialized');
}

// Make database available to routes
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/hospital', hospitalRoutes);
app.use('/api/customer', customerRoutes);
app.use('/api/batch', batchRoutes);
app.use('/api', verificationRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'PharmaChain Backend is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!', 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 PharmaChain Backend running on http://localhost:${PORT}`);
  console.log(`📊 Database: ${dbPath}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⏹️ Shutting down server...');
  db.close((err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('✅ Database connection closed');
    }
    process.exit(0);
  });
});