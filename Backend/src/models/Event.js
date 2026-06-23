const mongoose = require('mongoose');

/**
 * Event entity
 * Fields: EventID, Title, Description, EventDate, Location, Status,
 *         MeetupEventID, MeetupURL, CoverImage, GalleryImages[], CreatedAt, UpdatedAt
 */
const eventSchema = new mongoose.Schema(
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
    eventDate: {
      type: Date,
      required: [true, 'Event date is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'past', 'cancelled'],
      default: 'upcoming',
    },
    meetupEventId: {
      type: String,
      trim: true,
    },
    meetupURL: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
    },
    galleryImages: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
