'use strict'
const bcrypt = require('bcryptjs')
const employeeData = require('./employee-data.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // 產生加鹽雜湊後的預設密碼 titaner（一般員工的預設密碼）
    const password = await bcrypt.hashSync('titaner', bcrypt.genSaltSync(10))
    // 產生加鹽雜湊後的預設密碼 tiadmin（管理者的預設密碼）
    const adminPassword = await bcrypt.hashSync(
      'tiadmin',
      bcrypt.genSaltSync(10)
    )
    // 先產出多名一般員工的種子資料
    await queryInterface.bulkInsert(
      'Employees',
      Array.from(employeeData, (value) => ({
        code: value.code,
        full_name: value.full_name,
        identity: value.identity || 'employee',
        password,
        created_at: new Date(),
        updated_at: new Date()
      })),
      {}
    )
    // 再產出一名 demo 用管理員的種子資料
    await queryInterface.bulkInsert(
      'Employees',
      [{
        code: 'admin',
        full_name: '慕容怡君',
        identity: 'admin',
        password: adminPassword,
        created_at: new Date(),
        updated_at: new Date()
      }],
      {}
    )
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Employees', null, {})
  }
}
