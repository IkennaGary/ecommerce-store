const { isTokenValid } = require("../utils/jwt");
const { UnauthorizedError, UnauthenticatedError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ messsage: "Access denied. No token provided" });
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ messsage: "Access denied. No token provided" });
  }
  try {
    if (token) {
      const decode = isTokenValid(token);

      req.user = {
        id: decode.id,
        username: decode.username,
        role: decode.role,
      };
      next();
    }
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ messsage: "Invalid token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      res.status(StatusCodes.UNAUTHORIZED).json({ messsage: "Invalid token" });
      throw new UnauthorizedError(
        "Access denied. You don't have sufficient permissions"
      );
    }
    next();
  };
};

module.exports = { authenticateUser, authorizeRoles };
