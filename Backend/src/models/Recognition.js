const mongoose = require('mongoose');

/**
 * Recognition entity
 * Fields: RecognitionID, MemberID (FK), Title, Description, Month, Year, CreatedAt
 * Relationships: Member (1) -- (M) Recognition
 */
const recognitionSchema = new mongoose.Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
      required: [true, 'Member ID is required'],
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    month: {
      type: Number,
      required: [true, 'Month is required'],
      min: 1,
      max: 12,
    },
    year: {
      type: Number,
      required: [true, 'Year is required'],
      min: 2000,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recognition', recognitionSchema);
