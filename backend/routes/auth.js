const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { JWT_SECRET } = require('../middleware/auth');

const router = express.Router();

// Register endpoint
router.post('/signup', async (req, res) => {
  const { username, email, password, role, profileData } = req.body;

  try {
    // Validate input
    if (!username || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!['company', 'hospital', 'customer'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    req.db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (user) {
        return res.status(400).json({ error: 'User already exists with this email' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      const userId = uuidv4();

      // Create user
      req.db.run(
        'INSERT INTO users (id, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
        [userId, username, email, hashedPassword, role],
        function(err) {
          if (err) {
            console.error('Error creating user:', err);
            return res.status(500).json({ error: 'Failed to create user' });
          }

          // Create role-specific profile
          createRoleProfile(req.db, userId, role, profileData || {}, (profileErr) => {
            if (profileErr) {
              console.error('Error creating profile:', profileErr);
              return res.status(500).json({ error: 'User created but profile setup failed' });
            }

            res.status(201).json({ 
              message: 'User registered successfully',
              userId: userId,
              role: role
            });
          });
        }
      );
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    req.db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign(
        { 
          userId: user.id, 
          email: user.email, 
          role: user.role,
          username: user.username
        },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: user.username,
        role: user.role,
        message: 'Login successful'
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Helper function to create role-specific profiles
function createRoleProfile(db, userId, role, profileData, callback) {
  const profileId = uuidv4();

  switch (role) {
    case 'company':
      db.run(
        `INSERT INTO companies (id, user_id, name, location, license_id, contact_person, phone) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          profileId,
          userId,
          profileData.name || 'Company Name',
          profileData.location || 'Location',
          profileData.license_id || `LIC-${Date.now()}`,
          profileData.contact_person || '',
          profileData.phone || ''
        ],
        callback
      );
      break;

    case 'hospital':
      db.run(
        `INSERT INTO hospitals (id, user_id, name, location, registration_id, contact_person, phone) 
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          profileId,
          userId,
          profileData.name || 'Hospital Name',
          profileData.location || 'Location',
          profileData.registration_id || `REG-${Date.now()}`,
          profileData.contact_person || '',
          profileData.phone || ''
        ],
        callback
      );
      break;

    case 'customer':
      db.run(
        `INSERT INTO customers (id, user_id, name, location, phone) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          profileId,
          userId,
          profileData.name || 'Customer Name',
          profileData.location || 'Location',
          profileData.phone || ''
        ],
        callback
      );
      break;

    default:
      callback(new Error('Invalid role'));
  }
}

module.exports = router;