const mongoose = require('mongoose');

const loaiSchema = new mongoose.Schema({
  codeLoai: {
    type: String,
    required: true,
  },
  tenLoai: {
    type: String,
    required: true,
  },
  codeLoaiCha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'loai',
    default: null,
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

module.exports = mongoose.model('loai', loaiSchema);
