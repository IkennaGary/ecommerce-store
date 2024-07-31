const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const WishlistService = require("../services/WishlistService");

const addItemToWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  if (!productId) {
    throw new BadRequestError("productId is required");
  }
  try {
    const response = await WishlistService.addItemToWishlist(userId, productId);
    res.status(StatusCodes.CREATED).json({ sucess: true, data: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const removeItemFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  if (!productId) {
    throw new BadRequestError("productId is required");
  }
  try {
    const response = await WishlistService.removeItemFromWishlist(
      userId,
      productId
    );
    res.status(StatusCodes.OK).json({ sucess: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getWishlistItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlistItems = await WishlistService.getWishlistItems(userId);
    res.status(StatusCodes.OK).json({ success: true, data: wishlistItems });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistItems,
};
