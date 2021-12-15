const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    min: 5,
    max: 10,
  },
  password: {
    type: String,
    required: true,
    min: 10,
    max: 20,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('User', userSchema);
