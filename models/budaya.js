
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Budaya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Budaya.belongsTo(models.JenisBudaya);
      Budaya.belongsTo(models.Provinsi);
    }
  }
  Budaya.init({
    nama_budaya: DataTypes.STRING,
    image: DataTypes.STRING,
    registNum: DataTypes.INTEGER,
    tahun: DataTypes.INTEGER,
    desc: DataTypes.TEXT,
    video: DataTypes.STRING,
    JenisBudayaId: DataTypes.INTEGER,
    ProvinsiId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Budaya',
    timestamps: false,
  });
  return Budaya;
};