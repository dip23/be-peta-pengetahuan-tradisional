const { Op } = require("sequelize");
const getCursorData = require("../helpers/getCursorData.js");
const parseSequelizeOptions = require("../helpers/parseSequelizeOptions.js");
const db = require("../models/index.js");
const { deleteCloudPicture } = require("../services/cloudinary");

module.exports.getAll = async function (req, res) {
  try {
    const allData = await db.Budaya.findAll({
      attributes: ['id', 'nama_budaya'],
      include: [
        {
          model: db.Provinsi,
          attributes: ['nama_provinsi']
        }
      ],
      order: [
        ['id', 'ASC']
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
    });
  }
}

module.exports.getBudayaAll = async function (req, res) {
  try {
    const options = parseSequelizeOptions(req.query);
    options.include = [
      {
        model: db.JenisBudaya,
        attributes: ['nama_jenis'],
      },
      {
        model: db.Provinsi,
        attributes: ['nama_provinsi']
      }
    ];
    options.order = [
      ['id', 'DSC']
    ];
    const budaya = await db.Budaya.findAll(options);

    const cursor = await getCursorData(db.Budaya, req.query);

    return res.status(200).json({
      sucess: true,
      data: budaya,
      cursor
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}

module.exports.getListBudaya = async function (req, res) {
  const id = req.params.id;
  try {
    const list = await db.Budaya.findAll({
      attributes: ['id', 'nama_budaya'],
      where: {
        [Op.or]: [{ ProvinsiId: id }, { ProvinsiId: 35 }]
      }
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
    });
  }
}

module.exports.createBudaya = async function (req, res) {
  console.log('hit');
  const {
    nama_budaya,
    tahun,
    desc,
    JenisBudayaId,
    ProvinsiId
  } = req.body;

  const updateData = {
    nama_budaya,
    tahun,
    desc,
    JenisBudayaId,
    ProvinsiId
  };

  if(req.file) updateData.image = req.file.path

  try {
    // check if name exist
    const existBudaya = await db.Budaya.findOne({ where: { nama_budaya } })
    if (existBudaya) {
      return res.status(409).json({
        success: false,
        message: "Budaya sudah ada"
      });
    };

    const updatedData = await db.Budaya.create(updateData);

    return res.status(200).json({
      success: true,
      data: updatedData,
      message: "Budaya added!"
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}

module.exports.updateBudayaById = async function (req, res) {
  try {
    const { id } = req.params;
    const {
      nama_budaya,
      ProvinsiId,
      tahun,
      desc
    } = req.body;

    const editData = {
      nama_budaya,
      ProvinsiId,
      tahun,
      desc
    };

    if(req.file) editData.image = req.file.path;

    const editedData = await db.Budaya.findByPk(id);

    if (!editedData) {
      return res.status(404).json({
        sucess: false,
        message: 'Budaya not found!'
      });
    }

    editedData.update(editData);

    return res.status(200).json({
      success: true,
      data: editedData,
      message: 'Edit Success'
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}

module.exports.deleteBudayaById = async function (req, res) {
  try {
    const { id } = req.params;

    const deletedData = await db.Budaya.findByPk(id);

    if (!deletedData) {
      return res.status(404).json({
        sucess: false,
        message: 'Budaya not found!'
      });
    }

    if(deletedData.image) deleteCloudPicture(deletedData.image);

    await deletedData.destroy();

    return res.status(200).json({
      success: true,
      data: deletedData,
      message: 'Sucess delete Budaya'
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}

module.exports.initialId = async function (req, res) {
  try {
    const Budaya = await db.Budaya.findAll();
    await db.sequelize.query(
      `ALTER SEQUENCE "Budayas_id_seq" RESTART WITH ${Budaya.length + 1};`
    );
    return res.status(200).json({
      success: true,
      message: 'success'
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    });
  }
}