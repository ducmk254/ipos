const {string} = require('@hapi/joi');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  codeMonAn_Id: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'monan',
    required: true,
  }],
  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
  thanhtien: {
    type: Number,
    default: 0,
  },
  timeOrder: {
    type: Date,
    default: Date.now,
  },
  codeCustomer_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  remark: {
    type: String,
    default: '',
  },
  status: {
    type: string,
    enum: ['open', 'close'],
    default: 'open',
    required:true
  },
});
module.exports = mongoose.model('order', orderSchema);
