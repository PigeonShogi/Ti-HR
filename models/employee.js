'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate (models) {
      Employee.hasMany(models.Punch, { foreignKey: 'EmployeeId' })
    }
  }
  Employee.init({
    code: DataTypes.STRING,
    identity: DataTypes.STRING,
    fullName: DataTypes.STRING,
    password: DataTypes.STRING,
    typoCount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Employee',
    tableName: 'Employees',
    underscored: true
  })
  return Employee
}
