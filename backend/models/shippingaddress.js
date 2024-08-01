"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ShippingAddress extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ShippingAddress.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  ShippingAddress.init(
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      additionalInformation: DataTypes.TEXT,
      phoneNumber: DataTypes.STRING,
      additionalPhoneNumber: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      isDefault: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "ShippingAddress",
    }
  );
  return ShippingAddress;
};
