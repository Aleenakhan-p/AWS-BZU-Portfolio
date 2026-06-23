const Blog = require('../models/Blog');

// GET /api/blog
const getAll = async (req, res, next) => {
  try {
    const { category, limit, page, sort } = req.query;
    const filter = {};
    if (category) filter.category = category;

    const skip = page && limit ? (parseInt(page) - 1) * parseInt(limit) : 0;
    const sortOrder = sort === 'oldest' ? { publishedDate: 1 } : { publishedDate: -1 };

    let query = Blog.find(filter)
      .populate('authorId', 'name imageURL')
      .sort(sortOrder)
      .skip(skip);
    if (limit) query = query.limit(parseInt(limit));

    const posts = await query;
    res.json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

// GET /api/blog/recent
const getRecent = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const posts = await Blog.find({})
      .populate('authorId', 'name imageURL')
      .sort({ publishedDate: -1 })
      .limit(limit);
    res.json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};

// GET /api/blog/category/:category
const getByCategory = async (req, res, next) => {
  try {
    const { limit } = req.query;
    let query = Blog.find({ category: req.params.category })
      .populate('authorId', 'name imageURL')
      .sort({ publishedDate: -1 });
    if (limit) query = query.limit(parseInt(limit));
    res.json({ success: true, data: await query });
  } catch (err) {
    next(err);
  }
};

// GET /api/blog/search
const search = async (req, res, next) => {
  try {
    const { q, limit } = req.query;
    if (!q) return res.status(400).json({ success: false, error: 'Query parameter q is required.' });

    const regex = new RegExp(q, 'i');
    let query = Blog.find({
      $or: [{ title: regex }, { excerpt: regex }, { content: regex }],
    })
      .populate('authorId', 'name imageURL')
      .sort({ publishedDate: -1 });
    if (limit) query = query.limit(parseInt(limit));

    res.json({ success: true, data: await query });
  } catch (err) {
    next(err);
  }
};

// GET /api/blog/slug/:slug
const getBySlug = async (req, res, next) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug }).populate('authorId', 'name imageURL bio');
    if (!post) return res.status(404).json({ success: false, error: 'Blog post not found.' });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// GET /api/blog/:id
const getById = async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params.id).populate('authorId', 'name imageURL bio');
    if (!post) return res.status(404).json({ success: false, error: 'Blog post not found.' });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// POST /api/blog
const create = async (req, res, next) => {
  try {
    const post = await Blog.create(req.body);
    await post.populate('authorId', 'name imageURL');
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// PUT /api/blog/:id
const update = async (req, res, next) => {
  try {
    const post = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('authorId', 'name imageURL');
    if (!post) return res.status(404).json({ success: false, error: 'Blog post not found.' });
    res.json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/blog/:id
const remove = async (req, res, next) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, error: 'Blog post not found.' });
    res.json({ success: true, message: 'Blog post deleted.' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAll, getRecent, getByCategory, search, getBySlug, getById, create, update, remove };
