const CustomAPIError = require("./custom-api");
const BadRequestError = require("./bad-request");
const UnauthorizedError = require("./unauthorized");
const UnauthenticatedError = require("./unathenticated");
const NotFoundError = require("./not-found");

module.exports = {
  CustomAPIError,
  BadRequestError,
  UnauthorizedError,
  UnauthenticatedError,
  NotFoundError,
};
