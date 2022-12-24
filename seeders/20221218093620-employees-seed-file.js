'use strict'
const bcrypt = require('bcryptjs')
const employeeData = require('./employee-data.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 產生加鹽雜湊後的預設密碼 titaner
    const password = await bcrypt.hashSync('titaner', bcrypt.genSaltSync(10))
    await queryInterface.bulkInsert('Employees',
      Array.from(employeeData, value => ({
        code: value.code,
        full_name: value.full_name,
        identity: value.identity || 'employee',
        password,
        created_at: new Date(),
        updated_at: new Date()
      })
      ), {})
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {})
  }
}
