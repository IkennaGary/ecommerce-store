const Validator = require("fastest-validator");

const v = new Validator();

const createProductValidator = (body) => {
  const schema = {
    title: { type: "string", min: 3, max: 255 },
    description: { type: "string", min: 10 },
    categoryId: { type: "number", integer: true, positive: true },
    price: { type: "number", positive: true },
    discountPercentage: { type: "number", min: 0, max: 100, optional: true },
    rating: { type: "number", min: 0, max: 5, optional: true },
    stock: { type: "number", integer: true, min: 0 },
    tags: { type: "array", items: "string", optional: true },
    brand: { type: "string", min: 3, max: 255 },
    sku: { type: "string", min: 1, max: 100 },
    weight: { type: "number", positive: true },
    thumbnail: { type: "string", optional: false },
    images: { type: "array", items: "string", optional: true },
  };

  return v.validate(body, schema);
};

module.exports = { createProductValidator };
