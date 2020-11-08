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
    required:true
  },
  codeLoai_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loai',
    required:true
  },
  unit_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'unit',
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now(),
  },
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('monan', monanSchema);
