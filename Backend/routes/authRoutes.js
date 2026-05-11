const express = require('express');
const router = express.Router();
const { loginUser, registerUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', loginUser);

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', registerUser);

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, getUserProfile);

module.exports = router;

