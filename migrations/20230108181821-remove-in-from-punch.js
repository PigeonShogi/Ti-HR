'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.removeColumn('Punches', 'in', {
        transaction
      })
      await queryInterface.removeColumn('Punches', 'out', {
        transaction
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.addColumn('Punches', 'in', {
        type: Sequelize.DATE,
        allowNull: true
      })
      await queryInterface.addColumn('Punches', 'out', {
        type: Sequelize.DATE,
        allowNull: true
      })
      await transaction.commit()
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}
