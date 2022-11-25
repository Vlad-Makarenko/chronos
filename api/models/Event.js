const mongoose = require('mongoose');

module.exports.eventSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['arrangement', 'reminder', 'task', 'default'],
    default: 'default',
  },
  description: String,
  color: {
    type: String,
    default: 'green',
  },
  sharedParticipants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  startEvent: {
    type: Date,
    require: true,
  },
  endEvent: {
    type: Date,
    require: true,
  },
  isPerformed: {
    type: Boolean,
    default: false,
  },
});
