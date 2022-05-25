const db = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.Provinsi.findAll();
    return res.status(200).json({
      sucess: true,
      data: allData
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}