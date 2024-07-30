"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: "categories", // would find a suitable name later for this
      });
      Product.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Product.hasMany(models.Review, {
        foreignKey: "productId",
        as: "reviews",
      });
      Product.hasMany(models.CartItem, {
        foreignKey: "productId",
        as: "cartItems",
      });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      category: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      discountPercentage: DataTypes.DECIMAL,
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      reviewId: DataTypes.INTEGER,
      popularity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      rating: DataTypes.DECIMAL,
      stock: DataTypes.INTEGER,
      tags: DataTypes.JSON,
      brand: DataTypes.STRING,
      sku: DataTypes.STRING,
      weight: DataTypes.DECIMAL,
      hairType: DataTypes.STRING,
      length: DataTypes.STRING,
      capConstruction: DataTypes.STRING,
      inches: DataTypes.INTEGER,
      color: DataTypes.JSON,
      warrantyInformation: DataTypes.STRING,
      shippingInformation: DataTypes.STRING,
      returnPolicy: DataTypes.STRING,
      thumbnail: DataTypes.STRING,
      images: DataTypes.JSON,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
