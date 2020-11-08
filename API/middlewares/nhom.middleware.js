const mongoose = require('mongoose');
const indexModel = require('../models/index.model');

module.exports.checkMonAnExistInNhom = async (req, res, next) => {
  try {
    const currentNhom = await indexModel.nhom.findById(req.params.nhom_id);
    if (!currentNhom) return res.status(404).json({message: 'Not found'});
    req.body.existMonAnInNhom = false;
    if (currentNhom.codeMonAn_Id.length > 0) req.body.existMonAnInNhom = true;
    next();
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};

module.exports.checkDuplicateCodeNhom = async (req, res, next) => {
  try {
    if(req.body.hasOwnProperty("codeNhom")){
      const currentNhom = await indexModel.nhom.findOne({
        codeNhom: req.body.codeNhom,
      });
      if (currentNhom)
        return res.status(400).json({err: 'CodeNhom exist'}); // 400: bad request
      next();
    }else{
      return res.status(404).json({err:"Please input codeNhom"});
    }
  } catch (error) {
    return res.status(500).json({err: 'Co Loi :' + error});
  }
};
