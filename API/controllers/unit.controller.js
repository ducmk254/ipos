const indexModel = require('../models/index.model');

module.exports.getUnitList = async (req, res) => {
  try {
    return res
      .status(302)
      .json(await indexModel.unit.find().populate('codeMonAn_Id'));
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};

module.exports.getUnit = async (req, res) => {
  try {
    const unit = await indexModel.unit
      .findById(req.params.unit_id)
      .populate('codeMonAn_Id');
    if (!unit) return res.status(404).json({err: 'Not found!'});
    return res.status(302).json(unit);
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};

module.exports.addUnit = async (req, res) => {
  try {
    // Please check Duplicate codeUnit and tenUnit:
    await indexModel.unit
      .create({
        codeUnit: req.body.codeUnit,
        tenUnit: req.body.tenUnit,
        active: req.body.active,
      })
      .then((u) => {
        return res
          .status(201)
          .json({message: 'Create : ' + u.tenUnit + ' successfully'});
      });
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};

module.exports.changeUnit = async (req, res) => {
  // Only change name or active status of Unit
  // Don't change codeUnit:
  try {
    let currentUnit = await indexModel.unit.findById(req.params.unit_id);
    if (!currentUnit) return res.status(404).json({message: 'Unit not found'});
    await currentUnit.updateOne({
      tenUnit: req.body.tenUnit,
      active: req.body.active,
    });
    return res.status(200).json({message: 'Change sucessfully!'});
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};

module.exports.removeUnit = async (req, res) => {
  // neu unit dang duoc su dung thi khong remove duoc ma chir in-active duoc thoi
  try {
    let currentUnit = await indexModel.unit.findById(req.params.unit_id);
    if (!currentUnit)
      return res.status(403).json({message: "This Unit don't exist"});
    if (currentUnit.codeMonAn_Id.length > 0) {
      return res.status().json({message: 'This Unit was using...'});
    } else {
      await currentUnit.remove();
      return res.status(200).json({message: 'Remove successfully!'});
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi :' + error});
  }
};
