const express = require('express');
const router = express.Router();

// Mock user storage (in production, use MongoDB)
let users = [];
let nextUserId = 1;

// Mock JWT secret (in production, use environment variable)
const JWT_SECRET = 'mock-secret-key';

// Simple JWT-like token generation (for demo purposes)
function generateToken(user) {
  return `mock-token-${user.id}-${Date.now()}`;
}

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, company } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and password are required' 
      });
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'User already exists with this email' 
      });
    }

    // Create new user
    const newUser = {
      id: nextUserId++,
      name,
      email,
      password, // In production, hash this password
      company: company || '',
      createdAt: new Date(),
      isActive: true
    };

    users.push(newUser);

    // Generate token
    const token = generateToken(newUser);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        company: newUser.company
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during registration' 
    });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company
      },
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error during login' 
    });
  }
});

// Get user profile
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'No token provided' 
      });
    }

    // Extract user ID from mock token
    const userId = parseInt(token.split('-')[2]);
    const user = users.find(user => user.id === userId);

    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        company: user.company
      }
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error getting profile' 
    });
  }
});

// Logout endpoint
router.post('/logout', async (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

module.exports = router;
