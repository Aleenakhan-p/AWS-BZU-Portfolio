const Team = require('../models/Team');
const Member = require('../models/Member');

// GET /api/teams
const getAll = async (req, res, next) => {
  try {
    const teams = await Team.find({}).sort({ teamName: 1 });
    const teamsWithCount = await Promise.all(
      teams.map(async (team) => {
        const memberCount = await Member.countDocuments({ teamId: team._id });
        return { ...team.toObject(), memberCount };
      })
    );
    res.json({ success: true, data: teamsWithCount });
  } catch (err) {
    next(err);
  }
};

// GET /api/teams/name/:name
const getByName = async (req, res, next) => {
  try {
    const team = await Team.findOne({ teamName: new RegExp(`^${req.params.name}$`, 'i') });
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    const members = await Member.find({ teamId: team._id }).sort({ level: 1, name: 1 });
    res.json({ success: true, data: { ...team.toObject(), members, memberCount: members.length } });
  } catch (err) {
    next(err);
  }
};

// GET /api/teams/:teamId
const getById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    const members = await Member.find({ teamId: team._id }).sort({ level: 1, name: 1 });
    res.json({ success: true, data: { ...team.toObject(), members, memberCount: members.length } });
  } catch (err) {
    next(err);
  }
};

// GET /api/teams/:teamId/members
const getMembers = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    const members = await Member.find({ teamId: team._id }).sort({ level: 1, name: 1 });
    res.json({ success: true, data: members });
  } catch (err) {
    next(err);
  }
};

// GET /api/teams/:teamId/lead
const getLead = async (req, res, next) => {
  try {
    // Lead = first member with level 'Lead' in this team
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    const lead = await Member.findOne({ teamId: team._id, level: 'Lead' });
    res.json({ success: true, data: lead || null });
  } catch (err) {
    next(err);
  }
};

// POST /api/teams
const create = async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.status(201).json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};

// PUT /api/teams/:teamId
const update = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.teamId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    res.json({ success: true, data: team });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/teams/:teamId
const remove = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    res.json({ success: true, message: 'Team deleted.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/teams/:teamId/members  — assign an existing member to this team
const addMember = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    const member = await Member.findByIdAndUpdate(
      req.body.memberId,
      { teamId: team._id },
      { new: true }
    );
    if (!member) return res.status(404).json({ success: false, error: 'Member not found.' });
    const members = await Member.find({ teamId: team._id }).sort({ level: 1, name: 1 });
    res.json({ success: true, data: { ...team.toObject(), members, memberCount: members.length } });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/teams/:teamId/members/:memberId — move member to no team (unassign)
const removeMember = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });
    const member = await Member.findOneAndUpdate(
      { _id: req.params.memberId, teamId: team._id },
      { $unset: { teamId: '' } },
      { new: true }
    );
    if (!member) return res.status(404).json({ success: false, error: 'Member not found in this team.' });
    const members = await Member.find({ teamId: team._id }).sort({ level: 1, name: 1 });
    res.json({ success: true, data: { ...team.toObject(), members, memberCount: members.length } });
  } catch (err) {
    next(err);
  }
};

// PATCH /api/teams/:teamId/lead — promote a member to Lead level in this team
const setLead = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.teamId);
    if (!team) return res.status(404).json({ success: false, error: 'Team not found.' });

    // Demote existing leads in this team
    await Member.updateMany({ teamId: team._id, level: 'Lead' }, { level: 'Core' });

    // Promote the new lead
    const lead = await Member.findByIdAndUpdate(
      req.body.memberId,
      { teamId: team._id, level: 'Lead' },
      { new: true }
    );
    if (!lead) return res.status(404).json({ success: false, error: 'Member not found.' });

    const members = await Member.find({ teamId: team._id }).sort({ level: 1, name: 1 });
    res.json({ success: true, data: { ...team.toObject(), members, memberCount: members.length } });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getByName, getById, getMembers, getLead, create, update, remove, addMember, removeMember, setLead };
