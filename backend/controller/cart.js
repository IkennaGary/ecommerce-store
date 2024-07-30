const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const CartService = require("../services/CartService");

const addToCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  if (!productId || !quantity) {
    throw new BadRequestError("productId and quantity are required");
  }

  try {
    const cartItem = await CartService.addItemToCart(
      userId,
      productId,
      quantity
    );
    res.status(StatusCodes.CREATED).json({ sucess: true, data: cartItem });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error adding item to cart" });
  }
};

const getCartItems = async (req, res) => {
  const userId = req.user.id;

  try {
    const cartItems = await CartService.getCartItems(userId);
    res.status(StatusCodes.OK).json({ success: true, data: cartItems });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error getting cart items" });
  }
};

const removeItemFromCart = async (req, res) => {
  const { productId } = req.params;
  const userId = req.user.id;

  if (!productId) {
    throw new BadRequestError("productId is required");
  }

  try {
    const response = await CartService.removeItemFromCart(userId, productId);
    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error removing item from cart" });
  }
};

const updateCartQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.user.id;

  if (!productId || !quantity) {
    throw new BadRequestError("productId and quantity are required");
  }

  try {
    const response = await CartService.addItemToCart(
      userId,
      productId,
      quantity
    );
    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error updating cart quantity" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeItemFromCart,
  updateCartQuantity,
};
