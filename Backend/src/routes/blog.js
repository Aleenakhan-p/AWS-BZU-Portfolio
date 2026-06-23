const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAll, getRecent, getByCategory, search, getBySlug, getById, create, update, remove,
} = require('../controllers/blogController');

// Named routes first
router.get('/recent', getRecent);
router.get('/search', search);
router.get('/category/:category', getByCategory);
router.get('/slug/:slug', getBySlug);

router.get('/', getAll);
router.get('/:id', getById);

// Protected write routes
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

module.exports = router;
