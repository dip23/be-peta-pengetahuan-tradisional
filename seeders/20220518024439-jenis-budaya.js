'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('JenisBudayas', [
      {
        id: 1,
        nama_jenis: 'Pencatatan',
      },
      {
        id: 2,
        nama_jenis: 'Penetapan'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('JenisBudayas', null, {});
  }
};
