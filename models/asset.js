'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Asset extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Asset.init({
    name: DataTypes.STRING,
    serial: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    assignedTo: DataTypes.INTEGER,
    branchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Asset',
  });
  return Asset;
};