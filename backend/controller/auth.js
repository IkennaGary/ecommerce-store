const { StatusCodes } = require("http-status-codes");
const { signInValidator, signUpValidator } = require("../validators/auth");
const { User } = require("../models");
const bcrypt = require("bcryptjs");
const { createJwt, isTokenValid } = require("../utils/jwt");
const { BadRequestError, UnauthorizedError } = require("../errors");

const signUpUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError("All fields are required");
  }

  validatorResponse = signUpValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const exitingUser = await User.findOne({ where: { email: email } });

    if (exitingUser) {
      throw new BadRequestError("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const role = req.body?.role ? req.body.role : "user";

    const body = {
      username,
      email,
      password: hashedPassword,
      role,
    };

    const user = await User.create(body);

    const token = createJwt(user);

    res.status(StatusCodes.CREATED).json({
      message: "user created successfully",
      username: user.username,
      token,
      role,
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
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Incorrect password");
    }
    const token = createJwt(user);

    res.json({
      message: "User signed in successfully",
      username: user.username,
      token,
    });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = { signUpUser, signInUser };
