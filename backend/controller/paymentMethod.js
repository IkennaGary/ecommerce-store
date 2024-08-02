const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { PaymentMethod } = require("../models");

const createPaymentMethod = async (req, res) => {
  const { name, description, isActive } = req.body;

  if (!name || !description) {
    throw new BadRequestError("Name and Description fields are required");
  }
  try {
    if (await PaymentMethod.findOne({ where: { name } })) {
      throw new BadRequestError(
        "Payment method with the same name already exists"
      );
    }
    const paymentMethod = await PaymentMethod.create({
      name,
      description,
      isActive,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ success: true, data: paymentMethod });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPaymentMethods = async (req, res) => {
  try {
    const paymentMethods = await PaymentMethod.findAll();
    res.status(StatusCodes.OK).json({ success: true, data: paymentMethods });
  } catch (error) {
    console.error("Error fetching payment methods:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updatePaymentMethod = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("All fields are required");
  }

  try {
    const paymentMethod = await PaymentMethod.findByPk(id);

    if (!paymentMethod) {
      throw new NotFoundError("Payment method not found");
    }

    await paymentMethod.update(req.body, { where: { id } });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Payment method updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deletePaymentMethod = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const paymentMethod = await PaymentMethod.findByPk(id);

    if (!paymentMethod) {
      throw new NotFoundError("Payment method not found");
    }

    await paymentMethod.destroy();
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Payment method deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createPaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
};
