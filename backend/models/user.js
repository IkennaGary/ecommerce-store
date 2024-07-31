"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, { foreignKey: "userId", as: "product" });
      User.hasMany(models.Comment, { foreignKey: "userId", as: "comment" });
      User.hasMany(models.Post, { foreignKey: "authorId", as: "post" });
      User.hasMany(models.Review, { foreignKey: "userId", as: "reviews" });
      User.hasOne(models.Cart, { foreignKey: "userId", as: "cart" });
      User.hasOne(models.Wishlist, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("user", "admin", "seller", "super_admin"),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
