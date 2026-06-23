const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  getAll, getLeaderboard, getByTeam, getByLevel, searchByName,
  getById, create, update, remove, addPoints, updateRole,
} = require('../controllers/memberController');

// Named sub-routes before /:id to avoid conflicts
router.get('/leaderboard', getLeaderboard);
router.get('/team/:teamName', getByTeam);       // GET /members/team/:teamName
router.get('/level/:level', getByLevel);
router.get('/search/:name', searchByName);

router.get('/', getAll);
router.get('/:id', getById);

// Protected write routes
router.post('/', protect, create);
router.put('/:id', protect, update);
router.delete('/:id', protect, remove);
router.post('/:id/points', protect, addPoints);
router.patch('/:id/role', protect, updateRole);

module.exports = router;
