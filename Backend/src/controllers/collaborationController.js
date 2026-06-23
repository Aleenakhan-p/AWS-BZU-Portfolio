const Portfolio = require('../models/Portfolio');
const Partner = require('../models/Partner');
const University = require('../models/University');

// ─── Portfolio ────────────────────────────────────────────────────────────────

const getAllPortfolios = async (req, res, next) => {
  try {
    const items = await Portfolio.find({}).sort({ createdAt: -1 });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

const getPortfolioById = async (req, res, next) => {
  try {
    const item = await Portfolio.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Portfolio not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

const createPortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
};

const updatePortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, error: 'Portfolio not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

const deletePortfolio = async (req, res, next) => {
  try {
    const item = await Portfolio.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Portfolio not found.' });
    res.json({ success: true, message: 'Portfolio deleted.' });
  } catch (err) { next(err); }
};

// ─── Partner ─────────────────────────────────────────────────────────────────
// Note: spec uses /collaborations/partners with a "focus" filter field
// The Partner model has a "type" field (from DB spec) but the API spec uses "focus"
// We support both: /collaborations/partners/focus/:focus queries the "type" field

const getAllPartners = async (req, res, next) => {
  try {
    const items = await Partner.find({}).sort({ name: 1 });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

const getPartnerById = async (req, res, next) => {
  try {
    const item = await Partner.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Partner not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

const getPartnersByFocus = async (req, res, next) => {
  try {
    // "focus" in the API spec maps to "type" in the DB model
    const regex = new RegExp(req.params.focus, 'i');
    const items = await Partner.find({
      $or: [{ type: regex }, { description: regex }],
    }).sort({ name: 1 });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

const createPartner = async (req, res, next) => {
  try {
    const item = await Partner.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
};

const updatePartner = async (req, res, next) => {
  try {
    const item = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, error: 'Partner not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

const deletePartner = async (req, res, next) => {
  try {
    const item = await Partner.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'Partner not found.' });
    res.json({ success: true, message: 'Partner deleted.' });
  } catch (err) { next(err); }
};

// ─── University ───────────────────────────────────────────────────────────────

const getAllUniversities = async (req, res, next) => {
  try {
    const items = await University.find({}).sort({ name: 1 });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

const getUniversityById = async (req, res, next) => {
  try {
    const item = await University.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'University not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

const searchUniversities = async (req, res, next) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ success: false, error: 'Query parameter q is required.' });
    const items = await University.find({ name: new RegExp(q, 'i') });
    res.json({ success: true, data: items });
  } catch (err) { next(err); }
};

const createUniversity = async (req, res, next) => {
  try {
    const item = await University.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) { next(err); }
};

const updateUniversity = async (req, res, next) => {
  try {
    const item = await University.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, error: 'University not found.' });
    res.json({ success: true, data: item });
  } catch (err) { next(err); }
};

const deleteUniversity = async (req, res, next) => {
  try {
    const item = await University.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, error: 'University not found.' });
    res.json({ success: true, message: 'University deleted.' });
  } catch (err) { next(err); }
};

module.exports = {
  getAllPortfolios, getPortfolioById, createPortfolio, updatePortfolio, deletePortfolio,
  getAllPartners, getPartnerById, getPartnersByFocus, createPartner, updatePartner, deletePartner,
  getAllUniversities, getUniversityById, searchUniversities, createUniversity, updateUniversity, deleteUniversity,
};
