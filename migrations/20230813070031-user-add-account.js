'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('User','username', { 
      type: Sequelize.STRING,
      allowNull:false 
     });
     await queryInterface.addColumn("User", "password", {
      type: Sequelize.STRING,
      allowNull: false,
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn("User", "username");
    await queryInterface.removeColumn("User", "password");
  }
};
