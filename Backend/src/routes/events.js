const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAll,
  getUpcoming,
  getPast,
  getById,
  create,
  update,
  remove,
  addGalleryImage,
} = require('../controllers/eventController');

// Specific routes before /:id
router.get('/upcoming', getUpcoming);
router.get('/past', getPast);

router.get('/', getAll);
router.get('/:id', getById);

// Protected routes
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);
router.post('/:id/gallery', protect, addGalleryImage);

module.exports = router;
