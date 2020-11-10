const indexModel = require('../models/index.model');
const bcrypt = require('bcrypt');
module.exports.getUserList = async (req, res) => {
  try {
    return res.status(302).json(await indexModel.user.find());
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};

module.exports.getUser = async (req, res) => {
  try {
    const user = await indexModel.user.findById(req.params.user_id);
    if (!user) return res.status(404).json({message: 'user not exist'});
    return res.status(302).json(user);
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};

module.exports.addUser = async (req, res) => {
  try {
    const newUser = await indexModel.user({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hashSync(
        req.body.password,
        await bcrypt.genSaltSync(10)
      ),
      role: req.body.role,
    });
    await newUser.save();
    return res.status(201).json({message: 'Create successfully!'});
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    let user = await indexModel.user.findById(req.params.user_id);
    if (!user) return res.status(404).json({message: 'User not exist'});
    let newPassword = await bcrypt.hashSync(
      req.body.newPassword,
      await bcrypt.genSaltSync(10)
    );
    await user.updateOne({password: newPassword});
    return res.status(200).json({message: 'Password changed'});
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};

module.exports.chanRole = async (req, res) => {
  try {
    let user = await indexModel.user.findById(req.params.user_id);
    if (!user) return res.status(404).json({message: 'User not exist'});
    // check req.body.role:
    if (!req.body.hasOwnProperty('role'))
      return res.status(404).json({message: 'Please input role'});
    const role = '';
    if (req.body.role == 'BASIC' || req.body.role == 'ADMIN') {
      role = req.body.role;
    } else {
      role = 'BASIC';
    }
    await user.updateOne({role: role});
    return res.status(200).json({message: 'Role updated'});
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};
