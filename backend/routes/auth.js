const express = require("express");
const {
  signUpUser,
  signInUser,
  signInAdminUser,
  forgotPasswordSendCode,
  forgotPasswordVerifyEmail,
  changePassword,
} = require("../controller/auth");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/signin/admin", signInAdminUser);
router.post("/forgetPassword/send-code", forgotPasswordSendCode);
router.post("/forgetPassword/verify-email", forgotPasswordVerifyEmail);
router.post("/changePassword", changePassword);

module.exports = router;
