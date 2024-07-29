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
      Post.belongsTo(models.BlogCategory, {
        foreignKey: "categoryId",
        as: "categories",
      });
      Post.hasMany(models.Comment, { foreignKey: "postId", as: "comments" });
      Post.belongsTo(models.User, { foreignKey: "authorId", as: "author" });
      Post.hasMany(models.LikeDislike, { foreignKey: "postId", as: "likes" });
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
      thumbnail: DataTypes.STRING,
      category: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      tags: DataTypes.JSON,
      isPublished: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      publishedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
