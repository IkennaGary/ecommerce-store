const express = require("express");
const {
  addToCart,
  getCartItems,
  removeItemFromCart,
  updateCartQuantity,
} = require("../controller/cart");
const { authenticateUser } = require("../middleware/fullAuth");

const router = express.Router();

router.post("/add-to-cart/:productId", authenticateUser, addToCart);
router.get("/get-cart-items", authenticateUser, getCartItems);
router.delete("/remove-item/:productId", authenticateUser, removeItemFromCart);
router.put(
  "/update-cart-quantity/:productId",
  authenticateUser,
  updateCartQuantity
);

module.exports = router;
