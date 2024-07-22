const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./backend/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new error("Only images are allowed."), false);
  }
};

const multerImageUpload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 }, // 10MB
  fileFilter: fileFilter,
});

module.exports = multerImageUpload;
