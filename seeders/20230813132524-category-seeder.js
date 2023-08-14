'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(
      "ALTER TABLE Category AUTO_INCREMENT = 1;"
    );
    await queryInterface.bulkInsert(
      "Category",
      [
        {
          id: 1,
          name: "家居物業",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: "交通出行",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          name: "休閒娛樂",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 4,
          name: "餐飲食品",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 5,
          name: "其他",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Category", null, {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Category AUTO_INCREMENT = 1;"
    );
  }
};
