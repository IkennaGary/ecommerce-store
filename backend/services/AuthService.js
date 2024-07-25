const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { BadRequestError, UnauthorizedError } = require("../errors");

class AuthService {
  async register(username, email, password, role = "user") {
    const exitingUser = await User.findOne({ where: { email: email } });

    if (exitingUser) {
      throw new BadRequestError("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    role = role ? role : "user";

    const body = {
      username,
      email,
      password: hashedPassword,
      role,
    };
    const user = await User.create(body);
    return user;
  }

  async login(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Incorrect password");
    }

    return user;
  }
}

const authService = new AuthService();

module.exports = authService;
