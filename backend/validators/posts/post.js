const Validator = require("fastest-validator");

const v = new Validator();

const createPostValidator = (body) => {
  const schema = {
    title: { type: "string", min: 3, max: 255 },
    content: { type: "string", min: 10, max: 5000 },
    thumbnail: { type: "string", optional: false },
    authorId: { type: "number", integer: true },
    category: { type: "string", optional: false },
    categoryId: { type: "number", integer: true },
    tags: { type: "array", items: "string", optional: true },
    isPublished: { type: "boolean", optional: true },
  };

  return v.validate(body, schema);
};

module.exports = { createPostValidator };
