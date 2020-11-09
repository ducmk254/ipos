const mongoose = require('mongoose');
const customerSchema = new mongoose.Schema({
  fullname: {
    type: String,
    min: 3,
    max: 100,
    required: true,
  },
  diachiGiaoHang: {
    type: String,
    required: true,
  },
  codeOrder_Id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order',
    },
  ],
});

module.exports = mongoose.model("customer",customerSchema);
