'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      identity: {
        type: Sequelize.STRING,
        defaultValue: 'employee'
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        defaultValue: 'titaner'
      },
      typo_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Employees')
  }
}
