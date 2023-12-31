'use strict';
const fs = require('fs')
const parsedData = JSON.parse(fs.readFileSync('./data/massages.json'))
const massages = parsedData.map(el =>{
  el.createdAt = new Date ()
  el.updatedAt = new Date ()
  return el
})
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Massages', massages, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkInsert('Massages', null, {})

  }
};
