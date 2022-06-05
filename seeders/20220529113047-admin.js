'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Admins', [
      {
        nama: 'Admin',
        username: 'admin',
        password: '$2b$10$jhu2o4oQRc04osq2IXttcOes5DVHS9kTCOQsgXZh/xbMrJVMSPdam',
        email: 'admin@gmail.com'
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
