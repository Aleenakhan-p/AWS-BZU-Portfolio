const Member = require('../models/Member');
const Team = require('../models/Team');

// GET /api/members  — ?team=teamName&level=level
const getAll = async (req, res, next) => {
  try {
    const { team, level } = req.query;
    const filter = {};
    if (level) filter.level = level;

    // Resolve team name → ObjectId if provided
    if (team) {
      const teamDoc = await Team.findOne({ teamName: new RegExp(`^${team}$`, 'i') });
      if (teamDoc) filter.teamId = teamDoc._id;
    }

    const members = await Member.find(filter)
      .populate('teamId', 'teamName icon')
      .sort({ name: 1 });
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

// GET /api/members/leaderboard
const getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const members = await Member.find({})
      .populate('teamId', 'teamName')
      .sort({ points: -1 })
      .limit(limit);
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

// GET /api/members/team/:teamName  — lookup by team NAME (per spec)
const getByTeam = async (req, res, next) => {
  try {
    const teamDoc = await Team.findOne({ teamName: new RegExp(`^${req.params.teamName}$`, 'i') });
    if (!teamDoc) return res.status(404).json({ success: false, error: 'Team not found.' });
    const members = await Member.find({ teamId: teamDoc._id })
      .populate('teamId', 'teamName icon')
      .sort({ level: 1, name: 1 });
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

// GET /api/members/level/:level
const getByLevel = async (req, res, next) => {
  try {
    const members = await Member.find({ level: req.params.level })
      .populate('teamId', 'teamName')
      .sort({ name: 1 });
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

// GET /api/members/search/:name
const searchByName = async (req, res, next) => {
  try {
    const regex = new RegExp(req.params.name, 'i');
    const member = await Member.findOne({ name: regex }).populate('teamId', 'teamName');
    res.json({ success: true, data: member || null });
  } catch (err) {
    next(err);
  }
};

// GET /api/members/:id
const getById = async (req, res, next) => {
  try {
    const member = await Member.findById(req.params.id).populate('teamId', 'teamName icon');
    if (!member) return res.status(404).json({ success: false, error: 'Member not found.' });
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// POST /api/members
const create = async (req, res, next) => {
  try {
    const member = await Member.create(req.body);
    await member.populate('teamId', 'teamName icon');
    res.status(201).json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// PUT /api/members/:id
const update = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('teamId', 'teamName icon');
    if (!member) return res.status(404).json({ success: false, error: 'Member not found.' });
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/members/:id
const remove = async (req, res, next) => {
  try {
    const member = await Member.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found.' });
    res.json({ success: true, message: 'Member deleted.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/members/:id/points
const addPoints = async (req, res, next) => {
  try {
    const { points } = req.body;
    if (typeof points !== 'number') {
      return res.status(400).json({ success: false, error: 'points must be a number.' });
    }
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { $inc: { points } },
      { new: true }
    ).populate('teamId', 'teamName');
    if (!member) return res.status(404).json({ success: false, error: 'Member not found.' });
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/members/:id/role
const updateRole = async (req, res, next) => {
  try {
    const { role, level } = req.body;
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { role, level },
      { new: true, runValidators: true }
    ).populate('teamId', 'teamName');
    if (!member) return res.status(404).json({ success: false, error: 'Member not found.' });
    res.json({ success: true, data: member });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll, getLeaderboard, getByTeam, getByLevel, searchByName,
  getById, create, update, remove, addPoints, updateRole,
};
