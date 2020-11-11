const indexModel = require('../models/index.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.logOutAuth = async (req, res) => {
  try {
    // req.cookies.access_token:
    let token = req.signedCookies.access_token;
    if (!token) return res.status(200).json({message: 'you are logout'});
    let decoded = jwt.decode(token, process.env.SECRET);
    let user = await indexModel.user.findById(decoded.user_id);
    // console.log(user);
    if (!user) return res.status(404).json({message: "You aren't login"});
    if (user) {
      res.cookie('access_token', '', {
        maxAge: 0,
        signed: true,
        httpOnly: true,
      });
      return res.status(200).json({message: 'Logout ...'});
    }
  } catch (error) {
    return res.status(500).json({err: 'Loi: ' + error});
  }
};
