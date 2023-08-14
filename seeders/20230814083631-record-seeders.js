"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let transaction;

    try {
      await queryInterface.sequelize.query(
        "ALTER TABLE User AUTO_INCREMENT = 1;"
      );
      await queryInterface.sequelize.query(
        "ALTER TABLE Record AUTO_INCREMENT = 1;"
      );
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.bulkInsert(
        "User",
        [
          {
            id:1,
            name: "user1",
            username: "user1",
            password: "1234",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          { id:2,
            name: "user2",
            username: "user2",
            password: "1234",
            createdAt: new Date(),
            updatedAt: new Date(),
          }
        ],
        { transaction }
      );

      await queryInterface.bulkInsert(
        "Record",
        [
          {
            id: 1,
            name: "午餐",
            date: new Date("2019-04-23"),
            amount: "60",
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
            categoryId: 4,
          },
          {
            id: 2,
            name: "晚餐",
            date: new Date("2019-04-23"),
            amount: 60,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
            categoryId: 4,
          },
          {
            id: 3,
            name: "捷運",
            date: new Date("2019-04-23"),
            amount: 120,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
            categoryId: 2,
          },
          {
            id: 4,
            name: "電影 驚奇隊長",
            date: new Date("2019-04-23"),
            amount: 220,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 2,
            categoryId: 3,
          },
          {
            id: 5,
            name: "租金",
            date: new Date("2015-04-01"),
            amount: 25000,
            createdAt: new Date(),
            updatedAt: new Date(),
            userId: 1,
            categoryId: 1,
          },
        ],
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      if (transaction) {
        console.log(error);
        await transaction.rollback();
      }
    }
    
  },

  async down(queryInterface, Sequelize) {
    let transaction;
    try {
      
      transaction = await queryInterface.sequelize.transaction();
      await queryInterface.bulkDelete("Record", null, { transaction });
      await queryInterface.bulkDelete("User", null, { transaction });
      await queryInterface.sequelize.query(
        "ALTER TABLE User AUTO_INCREMENT = 1;"
      );
      await queryInterface.sequelize.query(
        "ALTER TABLE Record AUTO_INCREMENT = 1;"
      );
      await transaction.commit();
    } catch (error) {
      if (transaction) {
        console.log(error);
        await transaction.rollback();
      }
    }
    
  },
};


