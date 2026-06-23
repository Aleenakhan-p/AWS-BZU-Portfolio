const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  register,
  login,
  verifyToken,
  logout,
  refreshToken,
  requestPasswordReset,
  resetPassword,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/verify', protect, verifyToken);
router.post('/logout', protect, logout);
router.post('/refresh', protect, refreshToken);
router.post('/password-reset/request', requestPasswordReset);
router.post('/password-reset/confirm', resetPassword);

module.exports = router;
