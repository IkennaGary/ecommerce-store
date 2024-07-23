const BadRequestError = require("../errors/bad-request");
const { StatusCodes } = require("http-status-codes");
const cloudinary = require("../helper/cloudinaryConfig");

const uploadImage = async (req, res) => {
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

module.exports = uploadImage;
