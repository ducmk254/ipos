const mongoose = require('mongoose');
const {unit} = require('./index.model');
const unitSchema = new mongoose.Schema({
  codeUnit: {
    type: String,
    required: true,
  },
  tenUnit: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    required: true,
  },
});
module.exports = mongoose.model('unit', unitSchema);
