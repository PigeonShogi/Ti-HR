'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
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
