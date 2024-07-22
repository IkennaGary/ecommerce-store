const express = require("express");
const { signUpUser, signInUser } = require("../controller/auth");

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

module.exports = router;
