'use strict'
const employeeData = require('./employee-data.json')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Employees',
      Array.from(employeeData, value => ({
        code: value.code,
        full_name: value.full_name,
        identity: value.identity || 'employee',
        created_at: new Date(),
        updated_at: new Date()
      })
      ), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {})
  }
}
