const { BadRequestError, NotFoundError } = require("../errors");
const {
  Order,
  OrderItem,
  ShippingAddress,
  ShippingMethod,
  Product,
  PaymentMethod,
  Cart,
  CartItem,
  User,
} = require("../models");
const {
  createOrderValidator,
  orderStatusValidator,
} = require("../validators/order");
const { StatusCodes } = require("http-status-codes");

const createOrder = async (req, res) => {
  const { cartId, shippingAddressId, shippingMethodId, paymentMethodId } =
    req.body;
  const userId = req.user.id;
  const data = req.body;
  data.userId = userId;

  try {
    const cart = await Cart.findByPk(cartId, {
      include: [{ model: CartItem, as: "items" }],
    });

    if (!cart || cart.userId !== userId) {
      throw new BadRequestError("Invalid cart ID or user ID mismatch");
    }

    const shippingAddress = await ShippingAddress.findByPk(shippingAddressId);
    const shippingMethod = await ShippingMethod.findByPk(shippingMethodId);
    const paymentMethod = await PaymentMethod.findByPk(paymentMethodId);

    if (!shippingAddress || !shippingMethod || !paymentMethod) {
      throw new BadRequestError(
        "Invalid shipping address, method, or payment method"
      );
    }

    let totalAmount = 0;

    // console.log("///////", cart.dataValues.items);

    for (const item of cart.dataValues.items) {
      const product = await Product.findByPk(item.productId);
      if (!product) {
        throw new BAD_REQUEST(`Invalid product ID: ${item.productId}`);
      }
      totalAmount += product.price * item.quantity;
    }

    totalAmount += shippingMethod.cost;

    data.totalAmount = Number(totalAmount);

    validatorResponse = createOrderValidator(data);

    if (validatorResponse !== true) {
      throw new BadRequestError(validatorResponse[0]?.message);
    }

    const order = await Order.create({
      userId,
      totalAmount: data.totalAmount,
      status: "pending",
      paymentMethodId,
      shippingAddressId,
      shippingMethodId,
    });

    for (const item of cart.dataValues.items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      });
    }

    // Clear the cart after order creation
    await CartItem.destroy({ where: { cartId } });

    res.status(StatusCodes.CREATED).json({ success: true, data: order });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
              attributes: [
                "id",
                "title",
                "price",
                "description",
                "category",
                "brand",
              ],
            },
          ],
        },
        {
          model: ShippingAddress,
          attributes: [
            "id",
            "address",
            "city",
            "state",
            "phoneNumber",
            "country",
          ],
        },
        {
          model: ShippingMethod,
          attributes: ["id", "name", "cost"],
        },
        {
          model: PaymentMethod,
          attributes: ["id", "name", "description"],
        },
        {
          model: User,
          attributes: ["id", "username", "email"], // Include user info if needed
        },
      ],
    });

    res.status(StatusCodes.OK).json({ success: true, data: orders });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const order = await Order.findByPk(id, {
      include: [
        { model: OrderItem, include: [Product] },
        ShippingAddress,
        ShippingMethod,
        PaymentMethod,
      ],
    });

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    res.status(StatusCodes.OK).json({ success: true, data: order });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  const { id: userId } = req.user;
  try {
    const orders = await Order.findAll({
      where: { userId },
      include: [
        { model: OrderItem, include: [Product] },
        ShippingAddress,
        ShippingMethod,
        PaymentMethod,
      ],
    });

    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  if (!id || !status) {
    throw new BadRequestError("id and status are required");
  }

  validatorResponse = orderStatusValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      throw new NotFoundError("Order not found");
    }

    order.status = status;
    await order.save();

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Order status updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
};
