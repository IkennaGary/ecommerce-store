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
    const user = await AuthService.register(username, email, password, role);

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

const forgotPasswordSendCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new BadRequestError("All fields are required");
  }
  try {
    const response = await AuthService.forgotPasswordSendCode(email);
    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const forgotPasswordVerifyEmail = async (req, res) => {
  const { code, email } = req.body;

  if (!code || !email) {
    throw new BadRequestError("All fields are required");
  }

  try {
    const response = await AuthService.forgotPasswordVerifyEmail(email, code);

    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  const { newPassword, email } = req.body;

  if (!newPassword || !email) {
    throw new BadRequestError("Email and password required");
  }

  try {
    const response = await AuthService.changePassword(email, newPassword);
    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  signUpUser,
  signInUser,
  forgotPasswordSendCode,
  forgotPasswordVerifyEmail,
  changePassword,
};
