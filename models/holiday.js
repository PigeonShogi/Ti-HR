'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Holiday extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Holiday.init({
    date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Holiday',
    tableName: 'Holidays',
    underscored: true
  })
  return Holiday
}
