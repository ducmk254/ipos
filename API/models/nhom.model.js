const mongoose = require('mongoose');

const nhomSchema = new mongoose.Schema({
  codeNhom: {
    type: String,
    required: true,
  },
  tenNhom: {
    type: String,
    required: true,
  },
  codeNhomCha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'nhom',
    default:null
  },
  isNVL: {
    type: Boolean,
    required: true,
  },
  codeMonAn_Id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'monan',
    },
  ],
  active: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('nhom', nhomSchema);
