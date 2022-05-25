'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JenisBudaya extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JenisBudaya.hasMany(models.Budaya)
    }
  }
  JenisBudaya.init({
    nama_jenis: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JenisBudaya',
    timestamps: false
  });
  return JenisBudaya;
};