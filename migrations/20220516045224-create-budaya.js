'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Budayas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_budaya: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      registNum: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      tahun: {
        allowNull: true,
        type: Sequelize.INTEGER
      },
      desc: {
        allowNull: true,
        type: Sequelize.STRING
      },
      video: {
        allowNull: true,
        type: Sequelize.STRING
      },
      JenisBudayaId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'JenisBudayas', key: 'id' },
        onDelete: 'CASCADE'
      },
      ProvinsiId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Provinsis', key: 'id' },
        onDelete: 'CASCADE'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Budayas');
  }
};