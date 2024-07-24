const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { Product, Category, User } = require("../models");
const { createProductValidator } = require("../validators/product");
const { generateSku } = require("../utils/idGenerator");
const pagination = require("../utils/pagination");

const addProduct = async (req, res) => {
  const sku = generateSku();
  const { id } = req.user;

  req.body.sku = sku;
  req.body.userId = id;

  const { id: categoryId } = await Category.findOne({
    where: { name: req.body.category },
  });
  if (!categoryId) {
    throw new BadRequestError("Invalid category");
  }

  req.body.categoryId = categoryId;

  const existingProduct = await Product.findOne({
    where: { title: req.body.title, categoryId },
  });

  if (existingProduct) {
    throw new BadRequestError("Product already exists in this category");
  }

  validatorResponse = createProductValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  const response = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({ success: true, data: response });
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.pageSize) || 10;
  let sortBy = req.query.sortBy || "title";
  const sortDirection = req.query.sortDirection || "ASC";

  const offset = (page - 1) * limit;
  const order = [[sortBy, sortDirection]];

  const products = await Product.findAll({
    limit,
    offset,
    order,
    include: [
      { model: Category, as: "category" },
      { model: User, as: "user" },
    ],
  });
  const count = await Product.count();
  res.status(StatusCodes.OK).json({
    success: true,
    data: products,
    meta: pagination(count, { limit, page, offset }),
  });
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const response = await Product.findByPk(id);
    if (!response) {
      throw new BadRequestError("Product not found");
    }
    res.status(StatusCodes.OK).json({ success: true, data: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const { id: categoryId } = await Category.findOne({
      where: { name: req.body.category },
    });

    if (!categoryId) {
      throw new BadRequestError("Invalid category");
    }

    req.body.categoryId = categoryId;

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      throw new BadRequestError("Product not found in this category");
    }

    validatorResponse = createProductValidator(req.body);

    if (validatorResponse !== true) {
      throw new BadRequestError(validatorResponse[0]?.message);
    }

    await Product.update(req.body, { where: { id } });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const response = await Product.findByPk(id);

    if (!response) {
      throw new BadRequestError("Product not found");
    }

    await Product.destroy({ where: { id } });

    res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
