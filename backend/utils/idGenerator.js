const { v4 } = require("uuid");

const generateSku = () => {
  const prefix = "SKU_";
  const suffix = v4().toString().toUpperCase().substring(0, 8);
  return prefix.concat(suffix);
};

module.exports = { generateSku };
