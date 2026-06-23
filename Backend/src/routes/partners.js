const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { getAll, getById, getByType, create, update, remove } = require('../controllers/partnerController');

router.get('/type/:type', getByType);   // before /:id

router.get('/', getAll);
router.get('/:id', getById);

router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);

module.exports = router;
