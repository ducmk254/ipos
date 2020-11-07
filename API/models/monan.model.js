const mongoose = require('mongoose');
const monanSchema = new mongoose.Schema({
  codeMonAn: {
    type: String,
    required: true,
  },
  tenMonAn: {
    type: String,
    required: true,
  },
  gTC: {
    type: Number,
    default: 0,
    required: true,
  },
  gMV: {
    type: Number,
    default: 0,
    required: true,
  },
  codeNhom_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nhom',
  },
  codeLoai_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loai',
  },
  unit_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'unit',
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now + 365,
  },
  active: {
    type: Boolean,
    required: true,
  }
});

module.exports = mongoose.model('monan', monanSchema);
