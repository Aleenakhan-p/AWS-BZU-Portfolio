const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAll, getRecent, getByCategory, getByMemberId, getById,
  create, update, remove, createBulk,
} = require('../controllers/recognitionController');

// Named routes before /:id
router.get('/recent', getRecent);
router.get('/category/:category', getByCategory);
router.get('/member/:memberId', getByMemberId);

router.get('/', getAll);
router.get('/:id', getById);

// Protected write routes
router.post('/bulk', protect, createBulk);
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

module.exports = router;
