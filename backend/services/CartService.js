const { BadRequestError, UnauthorizedError } = require("../errors");
const { Cart, CartItem, Product } = require("../models");

class CartService {
  async getOrCreateCart(userId, attributes = null) {
    let cart = await Cart.findOne({
      where: { userId },
      include: {
        model: CartItem,
        as: "items",
        include: { model: Product, as: "product", attributes },
      },
    });

    if (!cart) {
      cart = await Cart.create({ userId });
    }

    return cart;
  }

  async addItemToCart(userId, productId, quantity) {
    const cart = await this.getOrCreateCart(userId);

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
      });
    }

    return cartItem;
  }

  async removeItemFromCart(userId, productId) {
    const cart = await this.getOrCreateCart(userId);

    await CartItem.destroy({ where: { cartId: cart.id, productId } });
    return "Item removed from cart";
  }

  async getCartItems(userId) {
    const cart = await this.getOrCreateCart(userId, [
      "sku",
      "id",
      "title",
      "description",
      "thumbnail",
      "category",
    ]);

    return cart.items;
  }

  async updateCartItemQuantity(userId, productId, quantity) {
    const cart = await this.getOrCreateCart(userId);

    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity = quantity;
      await cartItem.save();
      return cartItem;
    } else {
      throw new Error("Product not found in cart");
    }
  }
}

const cartService = new CartService();

module.exports = cartService;
