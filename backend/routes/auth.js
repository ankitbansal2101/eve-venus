const express = require('express');
const router = express.Router();

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    // Mock authentication - replace with real auth logic
    const mockUsers = {
      'sales@venus.com': { role: 'sales', name: 'Sales User' },
      'warehouse@venus.com': { role: 'warehouse', name: 'Warehouse User' },
      'customer@venus.com': { role: 'customer', name: 'Customer User' },
      'admin@venus.com': { role: 'admin', name: 'Admin User' }
    };

    const user = mockUsers[email];
    if (user && password === 'password123') {
      res.json({
        success: true,
        user: {
          email,
          role: user.role,
          name: user.name
        },
        token: 'mock-jwt-token'
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', (req, res) => {
  // Mock user data - replace with real auth middleware
  res.json({
    success: true,
    user: {
      email: 'user@venus.com',
      role: 'sales',
      name: 'Mock User'
    }
  });
});

module.exports = router;
