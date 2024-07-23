const Validator = require("fastest-validator");

const v = new Validator();

const createCategoryValidator = (body) => {
  const schema = {
    name: { type: "string", min: 3, max: 255 },
    description: { type: "string", min: 10 },
    image: { type: "string", optional: true },
  };

  return v.validate(body, schema);
};

module.exports = { createCategoryValidator };
