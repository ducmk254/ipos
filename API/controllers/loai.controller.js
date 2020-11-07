const {checkDuplicateCodeLoai} = require('../middlewares/loai.middleware');
const indexModel = require('../models/index.model');
const checkExistCodeLoai = require('../validates/loai.validate');
require('../validates/loai.validate');
module.exports.getDanhSachLoai = async (req, res) => {
  try {
    res.status(302); // 302: Found
    return res.json(
      await indexModel.loai
        .find()
        .populate('codeLoaiCha')
        .select('codeLoai tenLoai codeLoaiCha isNVL active')
    );
  } catch (error) {
    res.status(500);
    return res.json({err: 'Loi : ' + error});
  }
};

module.exports.getLoai = async (req, res) => {
  try {
    let currentLoai = await indexModel.loai.findById(req.params.loai_id);
    if (!currentLoai) return res.status(404).json({message: 'Not found!'});
    return res.status(302).json(currentLoai);
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.addLoai = async (req, res) => {
  try {
    // please validate : duplicate codeLoai
    await indexModel.loai
      .create({
        codeLoai: req.body.codeLoai,
        tenLoai: req.body.tenLoai,
        codeLoaiCha: req.body.codeLoaiCha,
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
module.exports.changeLoai = async (req, res) => {
  try {
    // Please validate : loai co ton tai ? sau do check xe da co mon an thuoc loai nay chua
    // neu co roi khong sua duoc ma loai nua
    let currentLoai = await indexModel.loai.findById(req.params.loai_id);
    // if (!currentLoai) return res.status(404).json({message: 'Not found !'});

    // if (!req.body.hasOwnProperty('codeLoaiCha')) req.body.codeLoaiCha = null;

    if (req.body.existMonAnInLoai == true) {
      // update lai codeLoai cho cac mon an:
      for (const monan_id of currentLoai.codeMonAn_Id) {
        await indexModel.monan.findByIdAndUpdate(monan_id, {
          codeLoai_Id: req.body.codeLoai,
        });
      }
      await currentLoai.updateOne({
        tenLoai: req.body.tenLoai,
        codeLoaiCha: req.body.codeLoaiCha,
        isNVL: req.body.isNVL,
        active: req.body.active,
      });
      return res.status(202).json({message: 'Changed finish!'});
    } else {
      // Luu thong tin Loai

      await currentLoai.updateOne({
        codeLoai: req.body.codeLoai,
        tenLoai: req.body.tenLoai,
        codeLoaiCha: req.body.codeLoaiCha,
        isNVL: req.body.isNVL,
        active: req.body.active,
      });
      return res.status(202).json({message: 'Changed finish--!'});
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.removeLoai = async (req, res) => {
  try {
    let currentLoai = await indexModel.loai.findById(req.params.loai_id);
    // if (!currentLoai) return res.status(404).json({message: 'Not found !'});
    if (req.body.existMonAnInLoai == true) {
      return res.status(304).json('Changed finish !'); //304: Not Modified
    } else {
      await currentLoai.deleteOne();
      return res.status(202).json('Remove finish !');
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi : ' + error});
  }
};

module.exports.createList = async (req, res) => {
  try {
    let dsLoai = req.body.loaiS;
    // console.log(dsLoai);
    let countDuplicateCode = 0;
    for (const loai of dsLoai) {
      if (await checkExistCodeLoai(loai.codeLoai) == true) {
        countDuplicateCode++;
      } else {
        await indexModel.loai.create({
          codeLoai: loai.codeLoai,
          tenLoai: loai.tenLoai,
          codeLoaiCha: loai.codeLoaiCha,
          isNVL: loai.isNVL,
          active: loai.active,
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
