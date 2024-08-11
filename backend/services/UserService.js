const bcrypt = require("bcryptjs");
const { User } = require("../models");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors");

class UserService {
  async updatePassword(id, currentPassword, newPassword) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      throw new UnauthorizedError("Incorrect current password");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await user.update({ password: hashedPassword });

    return "Password updated successfully";
  }

  async deleteUser(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await user.destroy();

    return "User deleted successfully";
  }

  async getUserById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return user;
  }

  async getAllUsers() {
    const users = await User.findAll();

    return users;
  }

  async updateUser(id, updatedData) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await user.update(updatedData);

    return "User updated successfully";
  }

  async updateUserRole(id, updatedData) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await user.update(updatedData);

    return "User Role updated successfully";
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ where: { email } });

    return user;
  }

  async getUserByUsername(username) {
    const user = await User.findOne({ where: { username } });

    return user;
  }

  async getCurrentUser(id) {
    const user = await User.findByPk(id, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new UnauthorizedError("User not found");
    }

    return user;
  }
}

const userService = new UserService();

module.exports = userService;
