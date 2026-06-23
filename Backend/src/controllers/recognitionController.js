const Recognition = require('../models/Recognition');

// GET /api/recognitions
const getAll = async (req, res, next) => {
  try {
    const { memberId, month, year, limit } = req.query;
    const filter = {};
    if (memberId) filter.memberId = memberId;
    if (month) filter.month = parseInt(month);
    if (year) filter.year = parseInt(year);

    let query = Recognition.find(filter)
      .populate('memberId', 'name imageURL role')
      .sort({ year: -1, month: -1 });
    if (limit) query = query.limit(parseInt(limit));

    const items = await query;
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

// GET /api/recognitions/recent
const getRecent = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const items = await Recognition.find({})
      .populate('memberId', 'name imageURL role')
      .sort({ year: -1, month: -1 })
      .limit(limit);
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

// GET /api/recognitions/category/:category
const getByCategory = async (req, res, next) => {
  try {
    const items = await Recognition.find({ category: req.params.category })
      .populate('memberId', 'name imageURL role')
      .sort({ year: -1, month: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

// GET /api/recognitions/member/:memberId
const getByMemberId = async (req, res, next) => {
  try {
    const items = await Recognition.find({ memberId: req.params.memberId })
      .sort({ year: -1, month: -1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

// GET /api/recognitions/:id
const getById = async (req, res, next) => {
  try {
    const item = await Recognition.findById(req.params.id)
      .populate('memberId', 'name imageURL role');
    if (!item) return res.status(404).json({ success: false, error: 'Recognition not found.' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// POST /api/recognitions
const create = async (req, res, next) => {
  try {
    const item = await Recognition.create(req.body);
    await item.populate('memberId', 'name imageURL role');
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// PUT /api/recognitions/:id
const update = async (req, res, next) => {
  try {
    const item = await Recognition.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('memberId', 'name imageURL role');
    if (!item) return res.status(404).json({ success: false, error: 'Recognition not found.' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/recognitions/:id
const remove = async (req, res, next) => {
  try {
    const item = await Recognition.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Recognition not found.' });
    res.json({ success: true, message: 'Recognition deleted.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/recognitions/bulk
const createBulk = async (req, res, next) => {
  try {
    const { recognitions } = req.body;
    if (!Array.isArray(recognitions) || recognitions.length === 0) {
      return res.status(400).json({ success: false, error: 'recognitions array is required.' });
    }
    const items = await Recognition.insertMany(recognitions);
    res.status(201).json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getRecent, getByCategory, getByMemberId, getById, create, update, remove, createBulk };
