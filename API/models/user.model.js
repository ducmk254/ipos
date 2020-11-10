const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    min: 5,
    max: 1024,
  },
  password: {
    type: String,
    min: 6,
    max: 1024,
    required: true,
  },
  role: {
    type: String,
    enum: ['BASIC', 'ADMIN'],
    required: true,
    default: 'BASIC',
  },
});

module.exports = mongoose.model('user', userSchema);
