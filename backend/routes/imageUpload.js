const express = require("express");
const imageUpload = require("../controller/image-upload");
const { authenticateUser } = require("../middleware/fullAuth");
const uploadToCloudinary = require("../middleware/imageUpload");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  uploadToCloudinary.single("image"),
  imageUpload
);
module.exports = router;
