'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Group.init(
    {
      group_name: DataTypes.STRING,
      group_category: DataTypes.STRING,
      representative_id: DataTypes.INTEGER,
      member_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Group'
    }
  );
  return Group;
};
