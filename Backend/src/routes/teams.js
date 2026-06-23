const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAll, getByName, getById, getMembers, getLead,
  create, update, remove, addMember, removeMember, setLead,
} = require('../controllers/teamController');

// Named routes before /:teamId to avoid conflicts
router.get('/name/:name', getByName);

router.get('/', getAll);
router.get('/:teamId', getById);
router.get('/:teamId/members', getMembers);
router.get('/:teamId/lead', getLead);

// Protected write routes
router.post('/', protect, create);
router.put('/:teamId', protect, update);
router.delete('/:teamId', protect, remove);
router.post('/:teamId/members', protect, addMember);
router.delete('/:teamId/members/:memberId', protect, removeMember);
router.patch('/:teamId/lead', protect, setLead);

module.exports = router;
