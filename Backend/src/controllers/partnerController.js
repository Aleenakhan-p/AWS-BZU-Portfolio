const Partner = require('../models/Partner');

// GET /api/partners
const getAll = async (req, res, next) => {
  try {
    const { type } = req.query;
    const filter = {};
    if (type) filter.type = type;
    const items = await Partner.find(filter).sort({ name: 1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

// GET /api/partners/:id
const getById = async (req, res, next) => {
  try {
    const item = await Partner.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Partner not found.' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// GET /api/partners/type/:type
const getByType = async (req, res, next) => {
  try {
    const items = await Partner.find({ type: req.params.type }).sort({ name: 1 });
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

// POST /api/partners
const create = async (req, res, next) => {
  try {
    const item = await Partner.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// PUT /api/partners/:id
const update = async (req, res, next) => {
  try {
    const item = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, error: 'Partner not found.' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/partners/:id
const remove = async (req, res, next) => {
  try {
    const item = await Partner.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Partner not found.' });
    res.json({ success: true, message: 'Partner deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getById, getByType, create, update, remove };
