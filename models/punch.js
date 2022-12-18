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
  Punch.init({
    workingDay: DataTypes.DATEONLY,
    state: DataTypes.STRING,
    in: DataTypes.DATE,
    out: DataTypes.DATE,
    EmployeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Punch',
    tableName: 'Punches',
    underscored: true
  })
  return Punch
}
