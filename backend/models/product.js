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
        foreignKey: "productId",
        as: "category",
      });
    }
  }
  Product.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      reviewId: DataTypes.INTEGER,
      price: DataTypes.DECIMAL,
      discountPercentage: DataTypes.DECIMAL,
      rating: DataTypes.DECIMAL,
      stock: DataTypes.INTEGER,
      tags: DataTypes.JSON,
      brand: DataTypes.STRING,
      sku: DataTypes.STRING,
      weight: DataTypes.DECIMAL,
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
