const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: false,
    },
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    date: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    typeEvent: {
      type: String,
      enum: ['cultural', 'academic', 'gala', 'party', 'trip'],
      required: true,
    },
    likes: {
      type: Number,
      required: false,
    },
  },
  {
    collection: 'event', // Specify the collection name as 'event'
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
