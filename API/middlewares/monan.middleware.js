const indexModel = require('../models/index.model');

module.exports.checkDuplicateCodeMonAn = async (req, res, next) => {
  try {
    const monan = await indexModel.monan.findOne({
      codeMonAn: req.body.codeMonAn,
    });
    if (monan)
      return res.status(403).json({message: req.body.codeMonAn + ' exist'});
    next();
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};
