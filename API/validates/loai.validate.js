const indexModel = require('../models/index.model');
async function checkExistCodeLoai(codeLoai) {
  const loai = await indexModel.loai.findOne({codeLoai: codeLoai});
  if (!loai) return false;
  return true;
}

module.exports = checkExistCodeLoai;
