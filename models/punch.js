'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class punch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  punch.init({
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
  return punch
}
