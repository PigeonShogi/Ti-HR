'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Punch extends Model {
    static associate (models) {
      Punch.belongsTo(models.Employee, {
        foreignKey: 'EmployeeId'
      })
    }
  }
  Punch.init(
    {
      workingDay: DataTypes.DATEONLY,
      workingHours: DataTypes.DECIMAL(4, 2),
      state: DataTypes.STRING,
      EmployeeId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Punch',
      tableName: 'Punches',
      underscored: true
    }
  )
  return Punch
}
