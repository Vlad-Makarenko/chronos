const mongoose = require('mongoose');

module.exports.userSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  calendars: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Calendar',
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});
