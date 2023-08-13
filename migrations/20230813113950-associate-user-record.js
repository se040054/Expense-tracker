'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Record", "userId", {
      type: Sequelize.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Record", "userId", {
      type: Sequelize.INTEGER,
    });
  }
};
