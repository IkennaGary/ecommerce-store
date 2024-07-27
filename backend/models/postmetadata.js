'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PostMetaData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PostMetaData.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    keywords: DataTypes.JSON,
    postId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PostMetaData',
  });
  return PostMetaData;
};