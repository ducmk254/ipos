const indexModel = require('../models/index.model');
async function checkExistCodeNhom(codeNhom) {
  const nhom = await indexModel.nhom.findOne({codeNhom: codeNhom});
  if (!nhom) return false;
  return true;
}

module.exports = checkExistCodeNhom;
