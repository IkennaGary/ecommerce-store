const express = require("express");
const {
  addItemToWishlist,
  removeItemFromWishlist,
  getWishlistItems,
} = require("../controller/wishlist");
const { authenticateUser } = require("../middleware/fullAuth");

const router = express.Router();

router.post("/:productId", authenticateUser, addItemToWishlist);
router.get("/", authenticateUser, getWishlistItems);
router.delete("/remove/:productId", authenticateUser, removeItemFromWishlist);

module.exports = router;
