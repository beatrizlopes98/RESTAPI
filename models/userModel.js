const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    required: false,
  },
  type: {
    type: String,
    enum: ['admin', 'owner', 'student'],
    required: false,
  },
},
{
    collection: 'user' // Specify the collection name as 'user'
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
