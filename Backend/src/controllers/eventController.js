const Event = require('../models/Event');

// GET /api/events
const getAll = async (req, res, next) => {
  try {
    const { status, limit } = req.query;
    const filter = {};
    if (status) filter.status = status;

    let query = Event.find(filter).sort({ eventDate: -1 });
    if (limit) query = query.limit(parseInt(limit));

    const events = await query;
    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

// GET /api/events/upcoming
const getUpcoming = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let query = Event.find({ status: 'upcoming' }).sort({ eventDate: 1 });
    if (limit) query = query.limit(limit);
    res.json({ success: true, data: await query });
  } catch (err) {
    next(err);
  }
};

// GET /api/events/past
const getPast = async (req, res, next) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let query = Event.find({ status: 'past' }).sort({ eventDate: -1 });
    if (limit) query = query.limit(limit);
    res.json({ success: true, data: await query });
  } catch (err) {
    next(err);
  }
};

// GET /api/events/:id
const getById = async (req, res, next) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: 'Event not found.' });
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

// POST /api/events
const create = async (req, res, next) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

// PUT /api/events/:id
const update = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ success: false, error: 'Event not found.' });
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/events/:id
const remove = async (req, res, next) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, error: 'Event not found.' });
    res.json({ success: true, message: 'Event deleted.' });
  } catch (err) {
    next(err);
  }
};

// POST /api/events/:id/gallery
const addGalleryImage = async (req, res, next) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ success: false, error: 'imageUrl is required.' });
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $push: { galleryImages: imageUrl } },
      { new: true }
    );
    if (!event) return res.status(404).json({ success: false, error: 'Event not found.' });
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getUpcoming, getPast, getById, create, update, remove, addGalleryImage };
