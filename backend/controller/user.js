const { StatusCodes } = require("http-status-codes");
const { User } = require("../models");
const { createJwt } = require("../utils/jwt");
const { BadRequestError } = require("../errors");
const UserService = require("../services/UserService");

const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new BadRequestError("Current password and new password required");
  }

  try {
    const user = await UserService.updatePassword(
      id,
      currentPassword,
      newPassword
    );
    const token = createJwt(user);

    res.status(StatusCodes.OK).json({
      message: "Password updated successfully",
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

const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    const response = await UserService.deleteUser(id);
    res.status(StatusCodes.OK).json({ message: response });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserService.getUserById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(StatusCodes.OK).json(users);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!updatedData) {
    throw new BadRequestError("All fields are required");
  }

  try {
    const response = await UserService.updateUser(id, updatedData);
    res.status(StatusCodes.OK).json({ message: response });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateUserRole = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!updatedData) {
    throw new BadRequestError("All fields are required");
  }

  try {
    const response = await UserService.updateUserRole(id, updatedData);
    res.status(StatusCodes.OK).json({ message: response });
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  if (!email) {
    throw new BadRequestError("Email is required");
  }

  try {
    const user = await UserService.getUserByEmail(email);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getUserByUsername = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    throw new BadRequestError("Username is required");
  }

  try {
    const user = await UserService.getUserByUsername(username);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getCurrentUser = async (req, res) => {
  const { id } = req.user;

  try {
    const user = await UserService.getCurrentUser(id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    console.log(error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  updatePassword,
  deleteUser,
  getUserById,
  getAllUsers,
  updateUser,
  updateUserRole,
  getUserByEmail,
  getUserByUsername,
  getCurrentUser,
};
