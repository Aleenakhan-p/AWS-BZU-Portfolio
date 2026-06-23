const mongoose = require('mongoose');

/**
 * University — partner universities
 */
const universitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    image: {
      type: String,
    },
    website: {
      type: String,
    },
    memberCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

universitySchema.index({ name: 'text' });

module.exports = mongoose.model('University', universitySchema);
