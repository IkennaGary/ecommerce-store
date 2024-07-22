const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");

const uploadImage = (req, res) => {
  if (req.file.filename) {
    res
      .status(StatusCodes.CREATED)
      .json({ message: "Image uploaded successfully", url: req.file.filename });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error uploading image" });
    throw new BadRequestError("No image provided");
  }
};

module.exports = uploadImage;
