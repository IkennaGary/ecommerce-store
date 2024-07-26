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
}

const authService = new AuthService();

module.exports = authService;
