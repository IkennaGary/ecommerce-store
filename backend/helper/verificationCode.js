const { VerificationCode } = require("../models");

const storeCodeInDatabase = async (email, code, expiryTime) => {
  try {
    await VerificationCode.create({
      email: email,
      code: code,
      expiryTime: expiryTime,
    });
    console.log("Verification code stored successfully");
  } catch (error) {
    console.error("Error storing verification code:", error);
  }
};

module.exports = storeCodeInDatabase;
