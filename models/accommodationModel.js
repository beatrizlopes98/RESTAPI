const mongoose = require('mongoose');

const accommodationSchema = new mongoose.Schema(
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
    photo: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: true,
    },
    availability: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    numRooms: {
      type: Number,
      required: true,
    },
    numPeople: {
      type: Number,
      required: true,
    },
    classification: {
      type: String,
      required: false,
    },
    typeAccommodation: {
      type: String,
      enum: ['private', 'shared', 'apartment', 'house', 'dorm'],
      required: true,
    },
  },
  {
    collection: 'accommodation', // Specify the collection name as 'accommodation'
  }
);

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = Accommodation;