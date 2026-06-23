const mongoose = require('mongoose');

/**
 * BlogPost entity
 * Fields: PostID, Title, Slug, Excerpt, Content, CoverImage,
 *         AuthorID (FK → Member), PublishedDate, CreatedAt, UpdatedAt
 * Relationships: Member (1) -- (M) BlogPost
 */
const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
    },
    content: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      default: null,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      enum: ['Announcement', 'Event', 'Program', 'Engineering'],
      required: [true, 'Category is required'],
    },
  },
  { timestamps: true }
);

// Text index for search
blogSchema.index({ title: 'text', excerpt: 'text', content: 'text' });

// Auto-generate slug from title if not provided
blogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  }
  next();
});

module.exports = mongoose.model('Blog', blogSchema);
