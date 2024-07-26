const express = require("express");
const {
  signUpUser,
  signInUser,
  forgotPasswordSendCode,
  forgotPasswordVerifyEmail,
} = require("../controller/auth");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);
router.post("/forgetPassword/send-code", forgotPasswordSendCode);
router.post("/forgetPassword/verify-email", forgotPasswordVerifyEmail);

module.exports = router;
