const mongoose = require('mongoose');
const chebienSchema = new mongoose.Schema({
  codeMonAnOutPut_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'monan',
    required: true,
  },
  codeMonAnInput_Id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'monan',
      required: true,
    },
  ],
  tile: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

module.exports = mongoose.model('chebien', chebienSchema);
