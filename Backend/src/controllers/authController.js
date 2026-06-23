const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

const formatUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  lastLogin: user.lastLogin,
});

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email already registered.' });
    }
    const user = await User.create({ name, email, password, role });
    const token = signToken(user._id);
    res.status(201).json({ success: true, data: { token, user: formatUser(user) } });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, error: 'Invalid email or password.' });
    }

    // Update lastLogin timestamp
    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id);
    res.json({ success: true, data: { token, user: formatUser(user) } });
  } catch (err) {
    next(err);
  }
};

// GET /api/auth/verify
const verifyToken = (req, res) => {
  res.json({ success: true, data: { valid: true, user: formatUser(req.user) } });
};

// POST /api/auth/logout
const logout = (req, res) => {
  res.json({ success: true, message: 'Logged out successfully.' });
};

// POST /api/auth/refresh
const refreshToken = (req, res) => {
  const token = signToken(req.user._id);
  res.json({ success: true, data: { token, user: formatUser(req.user) } });
};

// POST /api/auth/password-reset/request
const requestPasswordReset = async (req, res, next) => {
  try {
    // Stub — wire a real email service when ready
    res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/password-reset/confirm
const resetPassword = async (req, res, next) => {
  try {
    res.json({ success: true, message: 'Password reset successful.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, verifyToken, logout, refreshToken, requestPasswordReset, resetPassword };
