'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Expenses", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Expenses", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model:null,
        key:null
      }
    })
  }
};
