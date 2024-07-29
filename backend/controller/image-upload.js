const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../helper/cloudinaryConfig");

const uploadSingleImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "File uploaded successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "File upload failed" });
  }
};

const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      throw new BadRequestError("No files uploaded");
    }

    const uploadPromises = req.files.map((file) =>
      cloudinary.uploader.upload(file.path)
    );

    const results = await Promise.all(uploadPromises);

    const urls = results.map((result) => result.secure_url);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Files uploaded successfully",
      urls: urls,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "File upload failed",
    });
  }
};

module.exports = { uploadSingleImage, uploadMultipleImages };
