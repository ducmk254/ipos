const indexModel = require('../models/index.model');

module.exports.getMonAnList = async (req, res) => {
  try {
    return res
      .status(302)
      .json(
        await indexModel.monan
          .find()
          .populate('codeLoai_Id,codeNhom_Id,codeUnit_Id')
      );
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.getMonAn = async (req, res) => {
  try {
    const monan = await indexModel.monan
      .findById(req.params.monan_id)
      .populate('codeLoai_Id,codeNhom_Id,codeUnit_Id');
    if (!monan)
      return res
        .status(404)
        .json({message: req.params.monan_id + " don't exist"});
    return res.status(302).json(monan);
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.addMonAn = async (req, res) => {
  try {
    let monan = new indexModel.monan({
      codeMonAn: req.body.codeMonAn,
      tenMonAn: req.body.tenMonAn,
      gTC: req.body.gTC,
      gMV: req.body.gMV,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active,
      unit_Id: req.body.unit_Id,
      codeLoai_Id: req.body.codeLoai_Id,
      codeNhom_Id: req.body.codeNhom_Id,
    });
    // Update Unit , Loai, Nhom table:
    await indexModel.unit.findByIdAndUpdate(monan.unit_Id, {
      $push: {codeMonAn_Id: monan._id},
    });
    await indexModel.loai.findByIdAndUpdate(monan.codeLoai_Id, {
      $push: {codeMonAn_Id: monan._id},
    });
    await indexModel.nhom.findByIdAndUpdate(monan.codeNhom_Id, {
      $push: {codeMonAn_Id: monan._id},
    });
    //save monan :
    await monan.save();
    return res.status(201).json({message: 'Create finish', monan: monan});
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};
module.exports.changeMonAn = async (req, res) => {
  // codeMonAn khong the thay doi:
  try {
    let currentMonAn = await indexModel.monan.findById(req.params.monan_id);
    if (!currentMonAn)
      return res
        .status(403)
        .json({message: req.params.monan_id + " don't exist"});
    if (currentMonAn.unit_Id !== req.body.unit_id) {
      await indexModel.unit.findByIdAndUpdate(currentMonAn.unit_Id, {
        $pull: {codeMonAn_Id: currentMonAn._id},
      });
      await indexModel.unit.findByIdAndUpdate(req.body.unit_id, {
        $push: {codeMonAn_Id: currentMonAn._id},
      });
    }
    if (currentMonAn.codeNhom_Id !== req.body.nhom_id) {
      await indexModel.nhom.findByIdAndUpdate(currentMonAn.codeNhom_Id, {
        $pull: {codeMonAn_Id: currentMonAn._id},
      });
      await indexModel.nhom.findByIdAndUpdate(req.body.nhom_id, {
        $pull: {codeMonAn_Id: currentMonAn._id},
      });
    }
    if (currentMonAn.codeLoai_Id !== req.body.loai_id) {
      await indexModel.loai.findByIdAndUpdate(currentMonAn.codeLoai_Id, {
        $pull: {codeMonAn_Id: currentMonAn._id},
      });
      await indexModel.loai.findByIdAndUpdate(req.body.loai_id, {
        $push: {codeMonAn_Id: currentMonAn._id},
      });
    }
    await currentMonAn.updateOne({
      tenMonAn: req.body.tenMonAn,
      gTC: req.body.gTC,
      gMV: req.body.gMV,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active,
      unit_Id: req.body.unit_Id,
      codeLoai_Id: req.body.codeLoai_Id,
      codeNhom_Id: req.body.codeNhom_Id,
    });
    return res.status(200).json({message: 'change sucessfully'});
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.removeMonAn = async (req, res) => {
  try {
    //Please check SO first :if exist -> cannot remove moan.

    let currentMonAn = await indexModel.monan.findById(req.params.monan_id);
    if (!currentMonAn)
      return res
        .status(403)
        .json({message: req.params.monan_id + " don't exist"});
    // Update Unit, Loai, Nhom table:
    await indexModel.unit.findByIdAndUpdate(currentMonAn.unit_Id, {
      $pull: {codeMoanAn_Id: currentMonAn._id},
    });
    await indexModel.loai.findByIdAndUpdate(currentMonAn.codeLoai_Id, {
      $pull: {codeMoanAn_Id: currentMonAn._id},
    });
    await indexModel.nhom.findByIdAndUpdate(currentMonAn.codeNhom_Id, {
      $pull: {codeMoanAn_Id: currentMonAn._id},
    });
    await currentMonAn.deleteOne();
    return res.status(200).json({message: 'Delete sucessfully'});
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};
