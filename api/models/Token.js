const mongoose = require('mongoose');

module.exports.tokenSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  refreshToken: {
    type: String,
    required: true,
  },
});
