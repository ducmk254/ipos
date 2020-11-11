const indexModel = require('../models/index.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.loginAuth = async (req, res) => {
  try {
    // req.cookies.access_token:
    let token = req.signedCookies.access_token;
    // check token co hop le khong ?
    if (token) {
      let decoded = jwt.decode(token, process.env.SECRET);
      let user = await indexModel.user.findById(decoded.user_id);
      // console.log(user);
      if (user) return res.status(200).json({message: 'You are login ...'});
    }

    // check login by email or username:
    let username = await indexModel.user.findOne({username: req.body.username});
    let email = await indexModel.user.findOne({email: req.body.email});
    if (!username & !email) {
      return res.status(404).json({message: 'User or email not exist'});
    }
    if (username) {
      const checkPass = await bcrypt.compareSync(
        req.body.password,
        username.password
      );
      if (checkPass == false)
        return res
          .status(404)
          .json({message: "Password don't match with username"});
      const token = jwt.sign({user_id: username._id}, process.env.SECRET);
      res.cookie('access_token', token, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        signed: true,
        // secure:true
      });
      return res.json({message: 'Login sucessfully!'});
    }
    if (email) {
      const checkPass = await bcrypt.compareSync(
        req.body.password,
        email.password
      );
      if (checkPass == false)
        return res
          .status(404)
          .json({message: "Password don't match with email"});
      const token = jwt.sign({user_id: email._id}, process.env.SECRET);
      res.cookie('access_token', token, {
        maxAge: 365 * 24 * 60 * 60 * 100,
        httpOnly: true,
        signed: true,
        // secure:true
      });
      return res.json({message: 'Login sucessfully!'});
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};
