const mongoose = require('mongoose');
const indexModel = require('../models/index.model');

module.exports.checkMonAnExistInLoai = async (req, res, next) => {
  try {
    const currentLoai = await indexModel.loai.findById(req.params.loai_id);
    if (!currentLoai) return res.status(404).json({message: 'Not found'});
    req.body.existMonAnInLoai = false;
    if (currentLoai.codeMonAn_Id.length > 0) req.body.existMonAnInLoai = true;
    next();
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};

module.exports.checkDuplicateCodeLoai = async (req, res, next) => {
  try {
    if(req.body.hasOwnProperty("codeLoai")){
      const currentLoai = await indexModel.loai.findOne({
        codeLoai: req.body.codeLoai,
      });
      if (currentLoai)
        return res.status(400).json({err: 'CodeLoai exist'}); // 400: bad request
      next();
    }else{
      return res.status(404).json({err:"Please input codeLoai"});
    }
  } catch (error) {
    return res.status(500).json({err: 'Co Loi :' + error});
  }
};
