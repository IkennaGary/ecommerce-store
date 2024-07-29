"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LikeDislike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      LikeDislike.belongsTo(models.Post, { foreignKey: "postId", as: "post" });
    }
  }
  LikeDislike.init(
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      isLike: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "LikeDislike",
    }
  );
  return LikeDislike;
};
