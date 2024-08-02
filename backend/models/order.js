"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "userId" });
      Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
      Order.belongsTo(models.ShippingAddress, {
        foreignKey: "shippingAddressId",
      });
      Order.belongsTo(models.ShippingMethod, {
        foreignKey: "shippingMethodId",
      });
      Order.belongsTo(models.PaymentMethod, { foreignKey: "paymentMethodId" });
    }
  }
  Order.init(
    {
      userId: DataTypes.INTEGER,
      totalAmount: DataTypes.DECIMAL,
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "pending",
      },
      paymentMethodId: DataTypes.INTEGER,
      shippingAddressId: DataTypes.INTEGER,
      shippingMethodId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
