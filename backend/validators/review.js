const Validator = require("fastest-validator");

const v = new Validator();

const createReviewValidator = (body) => {
  const schema = {
    rating: { type: "number", min: 1, max: 5 },
    comment: { type: "string", optional: true },
    productId: { type: "number", integer: true },
    userId: { type: "number", integer: true },
  };

  return v.validate(body, schema);
};

module.exports = { createReviewValidator };
