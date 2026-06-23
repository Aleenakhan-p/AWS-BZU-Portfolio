const mongoose = require('mongoose');

/**
 * Team entity
 * Fields: TeamID, TeamName, Description, Icon, CreatedAt, UpdatedAt
 * Relationships: Team (1) -- (M) Member
 */
const teamSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: [true, 'Team name is required'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    icon: {
      type: String, // URL or icon class name / emoji
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
