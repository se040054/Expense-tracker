'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(
       "Expenses",
       [
         {
           name: "晚餐",
           date: new Date(),
           amount: 200,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
         {
           name: "早餐",
           date: new Date(),
           amount: 100,
           createdAt: new Date(),
           updatedAt: new Date(),
         },
       ],
       {}
     );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Expenses', null, {});
    
  }
};


// npx sequelize db:seed --seed 20230812075312-initial-seed