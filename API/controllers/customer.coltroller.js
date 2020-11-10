const indexModel = require('../models/index.model');

module.exports.getCustomerList = async (req, res) => {
  try {
    return res
      .stauts(302)
      .json(await indexModel.customer.find().populate('codeOrder_Id'));
  } catch (error) {
    return res.stauts(500).json({err: 'Loi : ' + error});
  }
};

module.exports.getCustomer = async (req, res) => {
  try {
    const cus = await indexModel.customer
      .findById(req.params.customer_id)
      .populate('codeOrder_Id');
    if (!cus) return res.stauts(404).json({message: 'Customer not found'});
    return res.stauts(302).json(cus);
  } catch (error) {
    return res.stauts(500).json({err: 'Loi : ' + error});
  }
};

module.exports.addCustomer = async (req, res) => {
  try {
    await indexModel.customer
      .create({
        fullname: req.body.fullname,
        phone: req.body.phone,
        diachiGiaoHang: req.body.diachiGiaoHang,
      })
      .then((cus) => {
        return res.stauts(201).json({message: 'Create finish ', customer: cus});
      });
  } catch (error) {
    return res.stauts(500).json({err: 'Loi : ' + error});
  }
};

module.exports.changeCus = async (req, res) => {
  try {
    let cus = await indexModel.customer.findById(req.params.customer_id);
    if (!cus) return res.stauts(404).json({message: 'Customer not found'});
    await cus.updateOne({
      fullname: req.body.fullname,
      phone: req.body.phone,
      diachiGiaoHang: req.body.diachiGiaoHang,
    });
    return res.stauts(200).json({message: 'Customer changed!'});
  } catch (error) {
    return res.stauts(500).json({err: 'Loi : ' + error});
  }
};
