const Validator = require("fastest-validator");

const v = new Validator();

const signUpValidator = (body) => {
  const schema = {
    username: { type: "string", optional: false, min: 3, max: 30 },
    email: { type: "email", optional: false, format: "email" },
    password: { type: "string", optional: false, min: 8, max: 100 },
    role: {
      type: "string",
      default: "user",
      enum: ["user", "admin", "seller", "super_admin"],
    },
  };

  return v.validate(body, schema);
};

const signInValidator = (body) => {
  const schema = {
    email: { type: "email", optional: false, format: "email" },
    password: { type: "string", optional: false, min: 8, max: 100 },
  };
  return v.validate(body, schema);
};

module.exports = { signUpValidator, signInValidator };
