const Validator = require("fastest-validator");

const v = new Validator();

const createOrderValidator = (body) => {
  const schema = {
    userId: { type: "number", integer: true },
    paymentMethodId: { type: "number", integer: true },
    shippingAddressId: { type: "number", integer: true },
    shippingMethodId: { type: "number", integer: true },
    totalAmount: { type: "number", positive: true },
    status: {
      type: "string",
      default: "pending",
      enum: ["pending", "completed", "shipped", "cancelled"],
    },
  };

  return v.validate(body, schema);
};

const orderStatusValidator = (body) => {
  const schema = {
    status: {
      type: "string",
      default: "pending",
      enum: ["pending", "completed", "shipped", "cancelled"],
    },
  };

  return v.validate(body, schema);
};

module.exports = { createOrderValidator, orderStatusValidator };
