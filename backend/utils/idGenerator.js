const { v4 } = require("uuid");

const generateSku = () => {
  const prefix = "SKU_";
  const suffix = v4().toString().toUpperCase().substring(0, 8);
  return prefix.concat(suffix);
};

const generateforgotPasswordCode = () => {
  return v4().toString().toUpperCase().substring(0, 6);
};

module.exports = { generateSku, generateforgotPasswordCode };
