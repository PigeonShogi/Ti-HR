'use strict'
const holidays2022 = require('../data/holidays_2022')
const holidays2023 = require('../data/holidays_2023')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Holidays',
      Array.from(holidays2022, (value) => ({
        date: value,
        created_at: new Date(),
        updated_at: new Date()
      })),
      {}
    )
    await queryInterface.bulkInsert(
      'Holidays',
      Array.from(holidays2023, (value) => ({
        date: value,
        created_at: new Date(),
        updated_at: new Date()
      })),
      {}
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Holidays', null, {})
  }
}
