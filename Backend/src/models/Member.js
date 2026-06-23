const mongoose = require('mongoose');

/**
 * Member entity
 * Fields: MemberID, Name, Email, Role, Level, Bio, ImageURL, LinkedInURL,
 *         GitHubURL, TeamID (FK), Points, CreatedAt, UpdatedAt
 * Relationships: Team (1) -- (M) Member
 *                Member (1) -- (M) BlogPost
 *                Member (1) -- (M) Recognition
 */
const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    level: {
      type: String,
      required: [true, 'Level is required'],
      enum: ['Lead', 'Core', 'Builder', 'Developer'],
    },
    bio: {
      type: String,
      trim: true,
    },
    imageURL: {
      type: String,
    },
    linkedInURL: {
      type: String,
    },
    gitHubURL: {
      type: String,
    },
    teamId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Team',
      required: [true, 'Team is required'],
    },
    points: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Text index for name search
memberSchema.index({ name: 'text', role: 'text' });

module.exports = mongoose.model('Member', memberSchema);
