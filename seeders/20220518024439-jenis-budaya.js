'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('JenisBudayas', [
      {
        nama_jenis: 'Pencatatan',
      },
      {
        nama_jenis: 'Penetapan'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JenisBudayas', null, {});
  }
};
