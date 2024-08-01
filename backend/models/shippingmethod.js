"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShippingMethod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ShippingMethod.init(
    {
      name: DataTypes.STRING,
      deliveryTime: DataTypes.STRING,
      cost: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "ShippingMethod",
    }
  );
  return ShippingMethod;
};
