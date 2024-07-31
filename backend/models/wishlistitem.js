"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class WishlistItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      WishlistItem.belongsTo(models.Wishlist, { foreignKey: "wishlistId" });
      WishlistItem.belongsTo(models.Product, { foreignKey: "productId" });
    }
  }
  WishlistItem.init(
    {
      wishlistId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "WishlistItem",
    }
  );
  return WishlistItem;
};
