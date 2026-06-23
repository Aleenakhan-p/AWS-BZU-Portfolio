const mongoose = require('mongoose');

/**
 * Portfolio — collaboration showcase items
 */
const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
    },
    link: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
