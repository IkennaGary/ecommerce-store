const Validator = require("fastest-validator");

const v = new Validator();

const createProductValidator = (body) => {
  const schema = {
    title: { type: "string", min: 3, max: 255 },
    description: { type: "string", min: 10 },
    category: { type: "string", optional: false },
    price: { type: "number", positive: true },
    discountPercentage: { type: "number", min: 0, max: 100, optional: true },
    categoryId: { type: "number", integer: true },
    userId: { type: "number", integer: true },
    reviewId: { type: "number", integer: true, optional: true },
    popularity: { type: "number", integer: true, min: 0, optional: true },
    shippingInformation: { type: "string", optional: true },
    returnPolicy: { type: "string", optional: true },
    warrantyInformation: { type: "string", optional: true },
    color: { type: "array", items: "string", optional: true },
    length: { type: "string", optional: true },
    hairType: { type: "string", optional: true },
    rating: { type: "number", min: 0, max: 5, optional: true },
    stock: { type: "number", integer: true, min: 0 },
    capConstruction: { type: "string", optional: true },
    inches: { type: "integer", optional: true },
    tags: { type: "array", items: "string", optional: true },
    brand: { type: "string", min: 3, max: 255 },
    weight: { type: "number", positive: true, optional: true },
    thumbnail: { type: "string", optional: false },
    images: { type: "array", items: "string", optional: true },
  };

  return v.validate(body, schema);
};

module.exports = { createProductValidator };
