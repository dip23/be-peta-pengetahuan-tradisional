const db = require("../models/index.js");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.Budaya.findAll({
      include: [
        {
          model: db.JenisBudaya,
          attributes: ['nama_jenis'],
        },
        {
          model: db.Provinsi,
          attributes: ['nama_provinsi']
        }
      ]
    });
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

module.exports.getListBudaya = async function (req, res) {
  try {
    const list = await db.Budaya.findAll({
      where: { ProvinsiId: req.params.id }
    })
    if (!list) {
      return res.status(404).json({
        success: false,
        message: "Budaya Not Found",
      });
    }
    return res.status(200).json({
      sucess: true,
      data: list
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}

module.exports.getBudayaDetail = async function (req, res) {
  try {
    const budaya = await db.Budaya.findByPk(req.params.id, {
      attributes: [
        'id',
        'nama_budaya',
        'image',
        'registNum',
        'tahun',
        'desc',
        'video',
      ],
      include: [
        {
          model: db.JenisBudaya,
          attributes: ['nama_jenis'],
        },
        {
          model: db.Provinsi,
          attributes: ['nama_provinsi']
        }
      ]
    })
    if (!budaya) {
      return res.status(404).json({
        success: false,
        message: "Budaya not found",
      });
    }
    return res.status(200).json({
      sucess: true,
      data: budaya
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}