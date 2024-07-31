const { BadRequestError, NotFoundError } = require("../errors");
const { Wishlist, WishlistItem, Product } = require("../models");

class WishlistService {
  async addItemToWishlist(userId, productId) {
    // Find or create wishlist for the user
    let wishlist = await Wishlist.findOne({ where: { userId } });
    if (!wishlist) {
      wishlist = await Wishlist.create({ userId });
    }

    const existingWishlist = await WishlistItem.findOne({
      where: { wishlistId: wishlist.id, productId },
    });

    if (existingWishlist) {
      throw new BadRequestError("Product already exists in the wishlist");
    }

    // Add product to wishlist
    await WishlistItem.create({ wishlistId: wishlist.id, productId });

    return "Item added to wishlist";
  }

  async removeItemFromWishlist(userId, productId) {
    const wishlist = await Wishlist.findOne({ where: { userId } });
    if (!wishlist) {
      throw new NotFoundError("Wishlist not found");
    }

    await WishlistItem.destroy({
      where: { wishlistId: wishlist.id, productId },
    });

    return "Item removed from wishlist";
  }

  async getWishlistItems(userId) {
    const wishlist = await Wishlist.findOne({
      where: { userId },
      include: {
        model: WishlistItem,
        include: {
          model: Product,
        },
      },
    });

    if (!wishlist) {
      return [];
    }

    return wishlist.WishlistItems.map((item) => item.Product);
  }
}

const wishlist = new WishlistService();

module.exports = wishlist;
