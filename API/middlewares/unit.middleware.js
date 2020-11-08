const indexModel = require('../models/index.model');

module.exports.checkDuplicateCodeUnit = async (req, res, next) => {
  try {
    if (req.body.hasOwnProperty('codeUnit')) {
      const nowUnit = await indexModel.unit.findOne({
        codeUnit: req.body.codeUnit,
      });
      if (nowUnit) return res.status(400).json({err: 'This unit exist'});
      next();
    } else {
      return res.status(404).json({err: 'please input codeUnit'});
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};
