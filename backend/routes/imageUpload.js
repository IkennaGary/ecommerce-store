const express = require("express");
const imageUpload = require("../controller/image-upload");
const multerImageUpload = require("../middleware/multerImage");
const { authenticateUser } = require("../middleware/fullAuth");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  multerImageUpload.single("image"),
  imageUpload
);
module.exports = router;
