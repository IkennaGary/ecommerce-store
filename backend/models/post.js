"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Post.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [3, 255],
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [10, 5000],
        },
      },
      authorId: DataTypes.INTEGER,
      views: DataTypes.INTEGER,
      tags: DataTypes.JSON,
      isPublished: DataTypes.BOOLEAN,
      publishedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
