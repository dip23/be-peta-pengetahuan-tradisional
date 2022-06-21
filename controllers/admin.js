require("dotenv").config({ path: "./.env" });
const db = require("../models/index.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.login = async function (req, res) {
  try {
    const admin = await db.Admin.findOne({ where: { email: req.body.email } });
    if (admin) {
      const password = bcrypt.compareSync(req.body.password, admin.password);
      if (password) {
        const token = await jwt.sign(
          { id: admin.id, name: admin.nama },
          process.env.SECRET_TOKEN,
          { expiresIn: '1h' }
        );
        res.cookie('jwt', token, {
          maxAge: 60 * 60 * 1000, httpOnly: true, secure: true, sameSite: 'none',
        });
        return res.status(200).json({
          success: true,
          message: "Login Sucess",
          data: {
            idAdmin: admin.id,
            email: admin.email,
            nama: admin.nama,
            username: admin.username,
            token
          }
        });
      }
      return res.status(401).json({
        success: false,
        message: "Email and Password didn't match"
      });
    }
    return res.status(401).json({
      success: false,
      message: "Email not registered"
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}

module.exports.comparePass = async function (req, res) {
  try {
    const salt = await bcrypt.genSalt();
    const encryptedPassword = await bcrypt.hash(req.body.password, salt);
    return res.status(200).json({
      success: true,
      data: encryptedPassword
    })
  } catch (error) {
    console.log(error);
  }
}

module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });

  return res.status(200).json({
    success: true,
    message: "Logout Success",
  });
};