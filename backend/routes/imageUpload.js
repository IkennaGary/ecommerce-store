const express = require("express");
const {
  uploadSingleImage,
  uploadMultipleImages,
} = require("../controller/image-upload");
const { authenticateUser } = require("../middleware/fullAuth");
const uploadToCloudinary = require("../middleware/imageUpload");

const router = express.Router();

router.post(
  "/image",
  authenticateUser,
  uploadToCloudinary.single("image"),
  uploadSingleImage
);
router.post(
  "/images",
  authenticateUser,
  uploadToCloudinary.array("images", 10),
  uploadMultipleImages
);
module.exports = router;
