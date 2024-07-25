const { StatusCodes } = require("http-status-codes");
const { signInValidator, signUpValidator } = require("../validators/auth");
const AuthService = require("../services/AuthService");
const { createJwt } = require("../utils/jwt");
const { BadRequestError } = require("../errors");

const signUpUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError("All fields are required");
  }

  validatorResponse = signUpValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const user = await authService.register(username, email, password, role);

    const token = createJwt(user);

    res.status(StatusCodes.CREATED).json({
      message: "user created successfully",
      username: user.username,
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const signInUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("All fields are required");
  }

  validatorResponse = signInValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const user = await AuthService.login(email, password);
    const token = createJwt(user);

    res.json({
      message: "User signed in successfully",
      username: user.username,
      token,
      role: user.role,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = { signUpUser, signInUser };
