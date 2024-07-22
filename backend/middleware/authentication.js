const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../errors");

const authentication = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError("Access denied. No token provided");
  }
  try {
    if (token) {
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { id: decode.id, username: decode.username };
      next();
    }
  } catch (error) {
    throw new UnauthorizedError("Invalid token");
  }
  next();
};

module.exports = authentication;
