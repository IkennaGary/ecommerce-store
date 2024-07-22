const { isTokenValid } = require("../utils/jwt");
const { UnauthorizedError, UnauthenticatedError } = require("../errors");

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new UnauthenticatedError("Access denied. No token provided");
  }
  try {
    if (token) {
      const decode = isTokenValid(token);

      req.user = { id: decode.id, username: decode.username };
      next();
    }
  } catch (error) {
    throw new UnauthenticatedError("Invalid token");
  }
  next();
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError(
        "Access denied. You don't have sufficient permissions"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
