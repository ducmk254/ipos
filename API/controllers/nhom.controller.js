const {checkDuplicateCodeNhom} = require('../middlewares/nhom.middleware');
const indexModel = require('../models/index.model');
const checkExistCodeNhom = require('../validates/nhom.validate');
require('../validates/nhom.validate');
module.exports.getDanhSachNhom = async (req, res) => {
  try {
    res.status(302); // 302: Found
    return res.json(
      await indexModel.nhom
        .find()
        .populate('codeNhomCha')
        .select('codeNhom tenNhom codeNhomCha isNVL active')
    );
  } catch (error) {
    res.status(500);
    return res.json({err: 'Loi : ' + error});
  }
};

module.exports.getNhom = async (req, res) => {
  try {
    let currentNhom = await indexModel.nhom.findById(req.params.nhom_id);
    if (!currentNhom) return res.status(404).json({message: 'Not found!'});
    return res.status(302).json(currentNhom);
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.addNhom = async (req, res) => {
  try {
    // please validate : duplicate codeNhom
    await indexModel.nhom
      .create({
        codeNhom: req.body.codeNhom,
        tenNhom: req.body.tenNhom,
        codeNhomCha: req.body.codeNhomCha,
        isNVL: req.body.isNVL,
        active: req.body.active,
      })
      .then(() => {
        return res.status(201).json({message: 'Successfully!'});
      });
  } catch (e) {
    return res.status(500).json({err: 'Loi : ' + e});
  }
};


module.exports.changeNhom = async (req, res) => {
  try {
    // Please validate :eNhom co ton tai ? sau do check xe da co mon an thuoceNhom nay chua
    // neu co roi khong sua duoc maeNhom nua
    let currenNhom = await indexModel.nhom.findById(req.params.nhom_id);
    // if (!currenNhom) return res.status(404).json({message: 'Not found !'});

    // if (!req.body.hasOwnProperty('codeNhomCha')) req.body.codeNhomCha = null;

    if (req.body.existMonAnInNhom == true) {
      // update lai codeNhom cho cac mon an:
      for (const monan_id of currenNhom.codeMonAn_Id) {
        await indexModel.monan.findByIdAndUpdate(monan_id, {
          codeNhom_Id: req.body.codeNhom,
        });
      }
      await currenNhom.updateOne({
        tenNhom: req.body.tenNhom,
        codeNhomCha: req.body.codeNhomCha,
        isNVL: req.body.isNVL,
        active: req.body.active,
      });
      return res.status(202).json({message: 'Changed finish!'});
    } else {
      // Luu thong tin Nhom

      await currenNhom.updateOne({
        codeNhom: req.body.codeNhom,
        tenNhom: req.body.tenNhom,
        codeNhomCha: req.body.codeNhomCha,
        isNVL: req.body.isNVL,
        active: req.body.active,
      });
      return res.status(202).json({message: 'Changed finish--!'});
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.removeNhom = async (req, res) => {
  try {
    let currenNhom = await indexModel.nhom.findById(req.params.nhom_id);
    // if (!curreneNhom) return res.status(404).json({message: 'Not found !'});
    if (req.body.existMonAnInNhom == true) {
      return res.status(304).json('Changed finish !'); //304: Not Modified
    } else {
      await currenNhom.deleteOne();
      return res.status(202).json('Remove finish !');
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.createList = async (req, res) => {
  try {
    let dsNhom = req.body.nhoms;
    // console.log(dsLoai);
    let countDuplicateCode = 0;
    for (const nhom of dsNhom) {
      if (await checkExistCodeNhom(nhom.codeNhom) == true) {
        countDuplicateCode++;
      } else {
        await indexModel.nhom.create({
          codeNhom: nhom.codeNhom,
          tenNhom: nhom.tenNhom,
          codeNhomCha: nhom.codeNhomCha,
          isNVL: nhom.isNVL,
          active: nhom.active,
        });
      }
    }
    return res
      .status(200)
      .json({duplicateNumber: countDuplicateCode, message: 'Import finish!!!'});
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};
