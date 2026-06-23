const mongoose = require('mongoose');

/**
 * Partner entity
 * Fields: PartnerID, Name, Logo, Website, Type, Description, CreatedAt, UpdatedAt
 */
const partnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    logo: {
      type: String, // URL to partner logo image
    },
    website: {
      type: String,
      trim: true,
    },
    type: {
      type: String,
      enum: ['sponsor', 'community', 'academic', 'corporate', 'media', 'other'],
      required: [true, 'Partner type is required'],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Partner', partnerSchema);
