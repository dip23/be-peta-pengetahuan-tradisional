const db = require("../models/index.js");
const { sequelize } = require("../models/index.js");
const math = require('mathjs');

module.exports.getCalculation = async function (req, res) {
  try {
    const dataBudaya = await db.Budaya.findAll();
    const dataProvinsi = await db.Provinsi.findAll();
    const totalIndividual = await db.Budaya.findAll({
      attributes: [[sequelize.fn('count', '*'), 'totalBudaya']],
      include: [
        {
          model: db.Provinsi
        }
      ],
      group: ['Provinsi.id']
    });

    let arrTotal = [];
    totalIndividual.forEach(item => {
      arrTotal.push(parseInt(item.dataValues.totalBudaya) + 1);
    });

    const stdev = math.std(arrTotal);

    const totalBudaya = dataBudaya.length + 33;
    const totalProvinsi = dataProvinsi.length;
    const average = totalBudaya / totalProvinsi;

    const low = average - (0.8 * stdev);
    const high = average + (0.8 * stdev);

    const dataCalculate = {
      total: totalBudaya,
      totalProvinsi,
      average,
      stdev,
      low,
      high
    }
    return res.status(200).json({
      success: true,
      message: 'success',
      data: dataCalculate
    })
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      error: error,
      message: error.message
    })
  }
}