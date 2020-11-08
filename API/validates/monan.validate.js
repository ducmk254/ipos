const indexModel = require('../models/index.model');
const joi = require('@hapi/joi');
const {unit} = require('../models/index.model');
const {ref} = require('@hapi/joi');
module.exports.monanValidateInput = async (req, res, next) => {
  let monanSchema = new joi.object({
    codeMonAn: joi.string().required(),
    tenMonAn: joi.string().required(),
    gTC: joi.number().required().default(0),
    gMV: joi.number().required().default(0),
    startDate: joi.date().default(Date.now()),
    endDate: joi.date(),
    active: joi.boolean().required(),
    unit_Id: joi.string().required(),
    codeNhom_Id: joi.string().required(),
    codeLoai_Id: joi.string().required(),
  });
  try {
    let {validate} = await monanSchema.validateAsync(req.body);
    next();
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};
