const Validator = require("fastest-validator");

const v = new Validator();

const createShippingInfoValidator = (body) => {
  const schema = {
    address: { type: "string", min: 3, max: 255 },
    userId: { type: "number", integer: true },
    phoneNumber: { type: "number", integer: true },
    additionalPhoneNumber: { type: "number", integer: true, optional: true },
    city: { type: "string", min: 3, max: 255 },
    state: { type: "string", min: 3, max: 255 },
    country: { type: "string", min: 3, max: 255 },
    additionalInformation: { type: "string", optional: true },
    isDefault: { type: "boolean", optional: true },
  };

  return v.validate(body, schema);
};

module.exports = { createShippingInfoValidator };
