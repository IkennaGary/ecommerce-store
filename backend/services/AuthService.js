const bcrypt = require("bcryptjs");
const { User, VerificationCode } = require("../models");
const { BadRequestError, UnauthorizedError } = require("../errors");
const sendMail = require("../utils/sendMail");
const { forgotPassVerifyTemplate } = require("../utils/emailTemplates");
const storeCodeInDatabase = require("../helper/verificationCode");
const { generateforgotPasswordCode } = require("../utils/idGenerator");

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
  async adminLogin(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("User not found");
    }
    console.log(user.role);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedError("Incorrect password");
    }

    if (user.role === "admin" || user.role === "super_admin") {
      return user;
    } else {
      throw new UnauthorizedError("User is not an admin");
    }
  }

  async forgotPasswordSendCode(email) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new BadRequestError("User not found");
    }
    const code = generateforgotPasswordCode();
    const expiryTime = new Date(Date.now() + 10 * 60 * 1000); // Code expires in 10 minutes

    // Store the code and expiry time in your database
    await storeCodeInDatabase(email, code, expiryTime);

    // sendMail(email, "Change Password", forgotPassVerifyTemplate);
    sendMail(
      "ikennagary1000@gmail.com",
      "Change Password",
      forgotPassVerifyTemplate(code)
    );

    return `Verication code sent to ${email}`;
  }

  async forgotPasswordVerifyEmail(email, submittedCode) {
    const record = await VerificationCode.findOne({
      where: { email, code: submittedCode },
    });

    if (!record) {
      throw new BadRequestError("Code is invalid");
    }

    const currentTime = new Date();
    if (currentTime > record.expiryTime) {
      throw new BadRequestError("Code has expired");
    }
    await VerificationCode.destroy({ where: { email, code: submittedCode } });

    return "User email verified";
  }

  async changePassword(email, newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await User.update({ password: hashedPassword }, { where: { email } });

    return "Password changed successfully";
  }
}

const authService = new AuthService();

module.exports = authService;
