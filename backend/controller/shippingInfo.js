const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const { ShippingAddress, ShippingMethod, User } = require("../models");
const { createShippingInfoValidator } = require("../validators/shippingInfo");

const addShippingAddress = async (req, res) => {
  const data = req.body;
  const userId = req.user.id;
  data.userId = userId;

  const validatorResponse = createShippingInfoValidator(data);
  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }
  try {
    const newAddress = await ShippingAddress.create(data);
    res.status(StatusCodes.CREATED).json({ sucess: true, data: newAddress });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getShippingAddresses = async (req, res) => {
  const userId = req.user.id;
  try {
    const addresses = await ShippingAddress.findAll({ where: { userId } });
    if (!addresses.length) {
      throw new NotFoundError("No shipping addresses found");
    }
    res.status(StatusCodes.OK).json({ success: true, data: addresses });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateShippingAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = req.body;
  data.userId = userId;

  const validatorResponse = createShippingInfoValidator(data);
  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const address = await ShippingAddress.findByPk(id, { where: { userId } });
    if (!address) {
      throw new NotFoundError("Shipping address not found");
    }
    await address.update(data);
    res.status(StatusCodes.OK).json({ success: true, data: address });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteShippingAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const address = await ShippingAddress.findByPk(id, { where: { userId } });
    if (!address) {
      throw new NotFoundError("Shipping address not found");
    }
    await address.destroy();
    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "address deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const setAsDefaultAddress = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    await ShippingAddress.update({ isDefault: false }, { where: { userId } });

    const updatedAddress = await ShippingAddress.findByPk(id, {
      where: { userId },
    });

    if (!updatedAddress) {
      throw new NotFoundError("Shipping address not found");
    }

    await updatedAddress.update({ isDefault: true });
    res.status(StatusCodes.OK).json({ success: true, data: updatedAddress });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const addShippingMethod = async (req, res) => {
  const { name, deliveryTime, cost } = req.body;
  if (!name || !deliveryTime || !cost) {
    throw new BadRequestError("All fields are required");
  }

  try {
    const newMethod = await ShippingMethod.create({ name, deliveryTime, cost });
    res.status(StatusCodes.CREATED).json(newMethod);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getShippingMethods = async (req, res) => {
  try {
    const methods = await ShippingMethod.findAll();
    res.status(StatusCodes.OK).json(methods);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateShippingMethod = async (req, res) => {
  const { id } = req.params;
  const { name, deliveryTime, cost } = req.body;

  if (!name || !deliveryTime || !cost) {
    throw new BadRequestError("All fields are required");
  }

  try {
    const method = await ShippingMethod.findByPk(id);
    if (!method) {
      throw new NotFoundError("Shipping method not found");
    }
    await method.update({ name, deliveryTime, cost });
    res.status(StatusCodes.OK).json(method);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteShippingMethod = async (req, res) => {
  const { id } = req.params;

  try {
    const method = await ShippingMethod.findByPk(id);
    if (!method) {
      throw new NotFoundError("Shipping method not found");
    }
    await method.destroy();
    res
      .status(StatusCodes.OK)
      .json({ message: "Shipping method deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  addShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
  deleteShippingAddress,
  setAsDefaultAddress,
  addShippingMethod,
  getShippingMethods,
  updateShippingMethod,
  deleteShippingMethod,
};
