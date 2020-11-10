const indexModel = require('../models/index.model');

module.exports.getOrderList = async (req, res) => {
  try {
    return res
      .status(302)
      .json(await indexModel.order.find().populate('codeMonAn_Id'));
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};

module.exports.getOrder = async (req, res) => {
  try {
    const order = await indexModel.order
      .findById(req.params.order_id)
      .populate('codeMonAn_Id');
    if (!order) return res.status(404).json({message: 'Order not found!'});
    return res.status(302).json(order);
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};

module.exports.addOrder = async (req, res) => {
  try {
    const newOrder = new indexModel.order({
      codeMonAn_Id: req.body.codeMonAn_Id,
      thanhtien: req.body.thanhtien,
      codeCustomer_Id: req.body.codeCustomer_Id,
      remark: req.body.remark,
    });
    await newOrder.save();
    // update customer table:
    await indexModel.customer.findByIdAndUpdate(req.body.codeCustomer_Id, {
      $push: {codeOrder_Id: newOrder._id},
    });

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};

module.exports.removeOrder = async (req, res) => {
  try {
    let order = await indexModel.customer.findById(req.params.order_id);
    if (!order) return res.status(404).json({message: 'Order not exist'});
    // update customer table:
    await indexModel.customer.findByIdAndUpdate(order.codeCustomer_Id, {
      $pull: {
        codeOrder_Id: order._id,
      },
    });
    // remove order:
    await order.deleteOne();
    return res.status(200).json({message: 'Deleted'});
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};
