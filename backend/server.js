const express = require('express');const express = require('express');

const cors = require('cors');const cors = require('cors');

const Database = require('better-sqlite3');const Database = require('better-sqlite3');

const bcrypt = require('bcryptjs');const path = require('path');

const jwt = require('jsonwebtoken');

const { v4: uuidv4 } = require('uuid');// Import routes

const path = require('path');const authRoutes = require('./routes/auth');

const companyRoutes = require('./routes/company');

const app = express();const hospitalRoutes = require('./routes/hospital');

const PORT = process.env.PORT || 3001;const customerRoutes = require('./routes/customer');

const JWT_SECRET = process.env.JWT_SECRET || 'pharmachain_secret_key_2024';const batchRoutes = require('./routes/batch');

const verificationRoutes = require('./routes/verification');

// Middleware

app.use(cors());const app = express();

app.use(express.json());const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));

// Middleware

// Initialize Databaseapp.use(cors());

const dbPath = path.join(__dirname, 'pharmachain.db');app.use(express.json());

const db = new Database(dbPath);app.use(express.urlencoded({ extended: true }));

console.log('✅ Connected to SQLite database');

// Initialize Database

// Initialize database tablesconst dbPath = path.join(__dirname, 'pharmachain.db');

function initializeTables() {const db = new Database(dbPath);

  // Users tableconsole.log('✅ Connected to SQLite database');

  db.exec(`initializeTables();

    CREATE TABLE IF NOT EXISTS users (

      id TEXT PRIMARY KEY,// Initialize database tables

      username TEXT NOT NULL,function initializeTables() {

      email TEXT UNIQUE NOT NULL,  // Users table for authentication

      password TEXT NOT NULL,  db.exec(`

      role TEXT NOT NULL CHECK (role IN ('company', 'hospital', 'customer')),    CREATE TABLE IF NOT EXISTS users (

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP      id TEXT PRIMARY KEY,

    )      username TEXT NOT NULL,

  `);      email TEXT UNIQUE NOT NULL,

      password TEXT NOT NULL,

  // Companies table      role TEXT NOT NULL CHECK (role IN ('company', 'hospital', 'customer')),

  db.exec(`      created_at DATETIME DEFAULT CURRENT_TIMESTAMP

    CREATE TABLE IF NOT EXISTS companies (    )

      id TEXT PRIMARY KEY,  `);

      user_id TEXT NOT NULL,

      name TEXT NOT NULL,  // Companies table

      location TEXT NOT NULL,  db.exec(`

      license_id TEXT UNIQUE NOT NULL,    CREATE TABLE IF NOT EXISTS companies (

      contact_person TEXT,      id TEXT PRIMARY KEY,

      phone TEXT,      user_id TEXT NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,      name TEXT NOT NULL,

      FOREIGN KEY (user_id) REFERENCES users (id)      location TEXT NOT NULL,

    )      license_id TEXT UNIQUE NOT NULL,

  `);      contact_person TEXT,

      phone TEXT,

  // Hospitals table      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  db.exec(`      FOREIGN KEY (user_id) REFERENCES users (id)

    CREATE TABLE IF NOT EXISTS hospitals (    )

      id TEXT PRIMARY KEY,  `);

      user_id TEXT NOT NULL,

      name TEXT NOT NULL,  // Hospitals table

      location TEXT NOT NULL,  db.exec(`

      registration_id TEXT UNIQUE NOT NULL,    CREATE TABLE IF NOT EXISTS hospitals (

      contact_person TEXT,      id TEXT PRIMARY KEY,

      phone TEXT,      user_id TEXT NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,      name TEXT NOT NULL,

      FOREIGN KEY (user_id) REFERENCES users (id)      location TEXT NOT NULL,

    )      registration_id TEXT UNIQUE NOT NULL,

  `);      contact_person TEXT,

      phone TEXT,

  // Customers table      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  db.exec(`      FOREIGN KEY (user_id) REFERENCES users (id)

    CREATE TABLE IF NOT EXISTS customers (    )

      id TEXT PRIMARY KEY,  `);

      user_id TEXT NOT NULL,

      name TEXT NOT NULL,  // Customers table

      location TEXT NOT NULL,  db.exec(`

      phone TEXT,    CREATE TABLE IF NOT EXISTS customers (

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,      id TEXT PRIMARY KEY,

      FOREIGN KEY (user_id) REFERENCES users (id)      user_id TEXT NOT NULL,

    )      name TEXT NOT NULL,

  `);      location TEXT NOT NULL,

      phone TEXT,

  // Medicine batches table      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

  db.exec(`      FOREIGN KEY (user_id) REFERENCES users (id)

    CREATE TABLE IF NOT EXISTS medicine_batches (    )

      id INTEGER PRIMARY KEY AUTOINCREMENT,  `);

      batch_id TEXT UNIQUE NOT NULL,

      medicine_name TEXT NOT NULL,  // Medicine batches table with blockchain features

      company_id TEXT NOT NULL,  db.exec(`

      manufacturer TEXT NOT NULL,    CREATE TABLE IF NOT EXISTS medicine_batches (

      manufacturing_date DATE NOT NULL,      id INTEGER PRIMARY KEY AUTOINCREMENT,

      expiry_date DATE NOT NULL,      batch_id TEXT UNIQUE NOT NULL,

      quantity INTEGER NOT NULL,      medicine_name TEXT NOT NULL,

      hash TEXT NOT NULL,      company_id TEXT NOT NULL,

      previous_hash TEXT NOT NULL,      manufacturer TEXT NOT NULL,

      digital_signature TEXT,      manufacturing_date DATE NOT NULL,

      public_key TEXT,      expiry_date DATE NOT NULL,

      status TEXT DEFAULT 'active',      quantity INTEGER NOT NULL,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,      unit TEXT NOT NULL DEFAULT 'tablets',

      FOREIGN KEY (company_id) REFERENCES companies (id)      batch_size INTEGER NOT NULL,

    )      description TEXT,

  `);      hash TEXT NOT NULL,

      previous_hash TEXT NOT NULL,

  // Customer purchases table      merkle_root TEXT,

  db.exec(`      digital_signature TEXT,

    CREATE TABLE IF NOT EXISTS customer_purchases (      public_key TEXT,

      id TEXT PRIMARY KEY,      status TEXT DEFAULT 'active' CHECK (status IN ('active', 'shipped', 'delivered', 'expired', 'recalled')),

      customer_id TEXT NOT NULL,      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

      batch_id TEXT NOT NULL,      FOREIGN KEY (company_id) REFERENCES companies (id)

      purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,    )

      pharmacy_name TEXT,  `);

      quantity_purchased INTEGER NOT NULL,

      verified BOOLEAN DEFAULT FALSE,  // Customer purchases table - NEW FEATURE for customers to track their medicines

      FOREIGN KEY (customer_id) REFERENCES customers (id),  db.exec(`

      FOREIGN KEY (batch_id) REFERENCES medicine_batches (batch_id)    CREATE TABLE IF NOT EXISTS customer_purchases (

    )      id TEXT PRIMARY KEY,

  `);      customer_id TEXT NOT NULL,

      batch_id TEXT NOT NULL,

  console.log('✅ Database tables initialized');      purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,

}      pharmacy_name TEXT,

      pharmacy_location TEXT,

initializeTables();      quantity_purchased INTEGER NOT NULL,

      price DECIMAL(10,2),

// Make database available to routes      prescription_number TEXT,

app.use((req, res, next) => {      doctor_name TEXT,

  req.db = db;      verified BOOLEAN DEFAULT FALSE,

  next();      FOREIGN KEY (customer_id) REFERENCES customers (id),

});      FOREIGN KEY (batch_id) REFERENCES medicine_batches (batch_id)

    )

// Authentication middleware  `);

function authenticateToken(req, res, next) {

  const authHeader = req.headers['authorization'];  // Hospital inventory table

  const token = authHeader && authHeader.split(' ')[1];  db.exec(`

    CREATE TABLE IF NOT EXISTS hospital_inventory (

  if (!token) {      id TEXT PRIMARY KEY,

    return res.status(401).json({ error: 'Access token required' });      hospital_id TEXT NOT NULL,

  }      batch_id TEXT NOT NULL,

      received_date DATETIME DEFAULT CURRENT_TIMESTAMP,

  jwt.verify(token, JWT_SECRET, (err, user) => {      quantity_received INTEGER NOT NULL,

    if (err) {      supplier_info TEXT,

      return res.status(403).json({ error: 'Invalid or expired token' });      verified BOOLEAN DEFAULT FALSE,

    }      FOREIGN KEY (hospital_id) REFERENCES hospitals (id),

    req.user = user;      FOREIGN KEY (batch_id) REFERENCES medicine_batches (batch_id)

    next();    )

  });  `);

}

  // Supply chain tracking table

// ===== AUTHENTICATION ROUTES =====  db.exec(`

    CREATE TABLE IF NOT EXISTS supply_chain_tracking (

// Signup      id TEXT PRIMARY KEY,

app.post('/api/signup', async (req, res) => {      batch_id TEXT NOT NULL,

  try {      from_entity TEXT NOT NULL,

    const { username, email, password, role } = req.body;      to_entity TEXT NOT NULL,

      location TEXT,

    if (!username || !email || !password || !role) {      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,

      return res.status(400).json({ error: 'All fields are required' });      status TEXT NOT NULL,

    }      notes TEXT,

      FOREIGN KEY (batch_id) REFERENCES medicine_batches (batch_id)

    if (!['company', 'hospital', 'customer'].includes(role)) {    )

      return res.status(400).json({ error: 'Invalid role' });  `);

    }

  console.log('✅ Database tables initialized');

    // Check if user exists}

    const existingUser = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (existingUser) {// Make database available to routes

      return res.status(409).json({ error: 'User already exists' });app.use((req, res, next) => {

    }  req.db = db;

  next();

    // Hash password and create user});

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = uuidv4();// Routes

app.use('/api/auth', authRoutes);

    const insertUser = db.prepare('INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)');app.use('/api/company', companyRoutes);

    insertUser.run(userId, username, email, hashedPassword, role);app.use('/api/hospital', hospitalRoutes);

app.use('/api/customer', customerRoutes);

    res.status(201).json({ app.use('/api/batch', batchRoutes);

      message: 'User registered successfully'app.use('/api', verificationRoutes);

    });

// Health check endpoint

  } catch (error) {app.get('/api/health', (req, res) => {

    console.error('Signup error:', error);  res.json({ 

    res.status(500).json({ error: 'Internal server error' });    status: 'OK', 

  }    message: 'PharmaChain Backend is running',

});    timestamp: new Date().toISOString()

  });

// Login});

app.post('/api/login', async (req, res) => {

  try {// Error handling middleware

    const { email, password } = req.body;app.use((err, req, res, next) => {

  console.error(err.stack);

    if (!email || !password) {  res.status(500).json({ 

      return res.status(400).json({ error: 'Email and password are required' });    error: 'Something went wrong!', 

    }    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'

  });

    // Find user});

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

    if (!user) {// 404 handler

      return res.status(401).json({ error: 'Invalid credentials' });app.use('*', (req, res) => {

    }  res.status(404).json({ error: 'Route not found' });

});

    // Verify password

    const isValidPassword = await bcrypt.compare(password, user.password);// Start server

    if (!isValidPassword) {app.listen(PORT, () => {

      return res.status(401).json({ error: 'Invalid credentials' });  console.log(`🚀 PharmaChain Backend running on http://localhost:${PORT}`);

    }  console.log(`📊 Database: ${dbPath}`);

});

    // Generate JWT token

    const token = jwt.sign(// Graceful shutdown

      { userId: user.id, email: user.email, role: user.role, username: user.username },process.on('SIGINT', () => {

      JWT_SECRET,  console.log('\n⏹️ Shutting down server...');

      { expiresIn: '24h' }  db.close();

    );  console.log('✅ Database connection closed');

  process.exit(0);

    res.json({});
      token,
      user: user.username,
      role: user.role,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== VERIFICATION ROUTES =====

// Verify batch
app.post('/verify', (req, res) => {
  try {
    const { batch_id } = req.body;
    
    if (!batch_id) {
      return res.status(400).json({ error: 'Batch ID is required' });
    }

    // Find batch
    const batch = db.prepare('SELECT * FROM medicine_batches WHERE batch_id = ?').get(batch_id);
    
    if (!batch) {
      return res.json({
        valid: false,
        message: 'Batch not found in the blockchain'
      });
    }

    // Simple verification - in real app, verify signatures
    const isValid = batch.status === 'active' && new Date(batch.expiry_date) > new Date();

    res.json({
      valid: isValid,
      message: isValid ? 'Batch is authentic and valid' : 'Batch is expired or invalid',
      batch: {
        batch_id: batch.batch_id,
        medicine_name: batch.medicine_name,
        manufacturer: batch.manufacturer,
        expiry_date: batch.expiry_date,
        status: batch.status
      }
    });

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Track batch
app.post('/track', (req, res) => {
  try {
    const { batch_id } = req.body;
    
    if (!batch_id) {
      return res.status(400).json({ error: 'Batch ID is required' });
    }

    const batch = db.prepare('SELECT * FROM medicine_batches WHERE batch_id = ?').get(batch_id);
    
    if (!batch) {
      return res.json({
        message: 'Batch not found',
        batch_hash: '',
        previous_hash: '',
        signature: '',
        public_key: ''
      });
    }

    res.json({
      message: 'Batch found in supply chain',
      batch_hash: batch.hash,
      previous_hash: batch.previous_hash,
      signature: batch.digital_signature || '',
      public_key: batch.public_key || ''
    });

  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ===== CUSTOMER ROUTES =====

// Get customer purchases (NEW FEATURE)
app.get('/api/customer/purchases', authenticateToken, (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get customer ID
    const customer = db.prepare('SELECT * FROM customers WHERE user_id = ?').get(req.user.userId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer profile not found' });
    }

    // Get purchases with batch details
    const purchases = db.prepare(`
      SELECT 
        cp.*,
        mb.medicine_name,
        mb.manufacturer,
        mb.expiry_date,
        mb.status
      FROM customer_purchases cp
      JOIN medicine_batches mb ON cp.batch_id = mb.batch_id
      WHERE cp.customer_id = ?
      ORDER BY cp.purchase_date DESC
    `).all(customer.id);

    res.json({
      purchases: purchases,
      total: purchases.length
    });

  } catch (error) {
    console.error('Customer purchases error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add purchase record (NEW FEATURE)
app.post('/api/customer/add-purchase', authenticateToken, (req, res) => {
  try {
    if (req.user.role !== 'customer') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { batch_id, pharmacy_name, quantity_purchased } = req.body;

    if (!batch_id || !quantity_purchased) {
      return res.status(400).json({ error: 'Batch ID and quantity are required' });
    }

    // Get customer ID
    const customer = db.prepare('SELECT * FROM customers WHERE user_id = ?').get(req.user.userId);
    if (!customer) {
      return res.status(404).json({ error: 'Customer profile not found' });
    }

    // Verify batch exists
    const batch = db.prepare('SELECT * FROM medicine_batches WHERE batch_id = ?').get(batch_id);
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    // Add purchase record
    const purchaseId = uuidv4();
    const insertPurchase = db.prepare(`
      INSERT INTO customer_purchases (id, customer_id, batch_id, pharmacy_name, quantity_purchased) 
      VALUES (?, ?, ?, ?, ?)
    `);
    insertPurchase.run(purchaseId, customer.id, batch_id, pharmacy_name || '', quantity_purchased);

    res.status(201).json({
      message: 'Purchase recorded successfully',
      purchase_id: purchaseId
    });

  } catch (error) {
    console.error('Add purchase error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
  db.close();
  console.log('✅ Database connection closed');
  process.exit(0);
});