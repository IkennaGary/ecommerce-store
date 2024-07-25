const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { Product, Category, User } = require("../models");
const ProductService = require("../services/ProductService");
const { createProductValidator } = require("../validators/product");
const { generateSku } = require("../utils/idGenerator");
const pagination = require("../utils/pagination");

const addProduct = async (req, res) => {
  const sku = generateSku();
  const { id } = req.user;

  const data = req.body;
  data.sku = sku;
  data.userId = id;

  validatorResponse = createProductValidator(data);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }
  try {
    const response = await ProductService.addProduct(data);
    res.status(StatusCodes.CREATED).json({ success: true, data: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};
const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let sortBy = req.query.sortBy || "title";
  const sortDirection = req.query.sortDirection || "ASC";
  const params = req.query;

  try {
    const count = await ProductService.countRecords({});

    const { products, pageParams } = await ProductService.getAllProducts(
      page,
      limit,
      sortBy,
      sortDirection,
      params
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: products,
      meta: pagination(count, pageParams),
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    await ProductService.incrementPopularity(id);

    const response = await ProductService.getProduct(id);
    res.status(StatusCodes.OK).json({ success: true, data: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;

  const data = req.body;

  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const response = await ProductService.updateProduct(id, data);

    res.status(StatusCodes.OK).json({ success: true, message: response });
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
    const response = await ProductService.deleteProduct(id);

    res.status(StatusCodes.OK).json({ success: true, message: response });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let sortBy = req.query.sortBy || "title";
  const sortDirection = req.query.sortDirection || "ASC";
  const params = req.query;

  if (!categoryId) {
    throw new BadRequestError("categoryId is required");
  }

  const count = await ProductService.countRecords({ categoryId: categoryId });

  try {
    const { products, pageParams } = await ProductService.getProductsByCategory(
      categoryId,
      page,
      limit,
      sortBy,
      sortDirection,
      params
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: products,
      meta: pagination(count, pageParams),
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getProductsByUser = async (req, res) => {
  const { id: userId } = req.user;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  let sortBy = req.query.sortBy || "title";
  const sortDirection = req.query.sortDirection || "ASC";
  const params = req.query;

  try {
    const count = await ProductService.countRecords({ userId: userId });

    const { products, pageParams } = await ProductService.getProductsByUser(
      userId,
      page,
      limit,
      sortBy,
      sortDirection,
      params
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: products,
      meta: pagination(count, pageParams),
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getRelatedProducts = async (req, res) => {
  let limit = parseInt(req.query.limit) || 10;
  let { id: productId } = req.params;
  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      throw new BadRequestError("Product not found");
    }
    const categoryId = product.categoryId;

    const products = await ProductService.getRelatedProducts(
      productId,
      categoryId,
      limit
    );

    res.status(StatusCodes.OK).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getTopRatedProducts = async (req, res) => {
  let limit = parseInt(req.query.limit) || 10;

  try {
    const products = await ProductService.getTopRatedProducts(limit);
    res.status(StatusCodes.OK).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getPopularProducts = async (req, res) => {
  let limit = parseInt(req.query.limit) || 10;
  try {
    const products = await ProductService.getPopularProducts(limit);
    res.status(StatusCodes.OK).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const getProductsBySearch = async (req, res) => {
  const { searchQuery } = req.query;

  if (!searchQuery) {
    throw new BadRequestError("Search query is required");
  }
  try {
    const products = await ProductService.searchProducts(searchQuery);

    for (const product of products) {
      await ProductService.incrementPopularity(product.id);
    }

    res.status(StatusCodes.OK).json({ success: true, data: products });
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
  getProductsByCategory,
  getProductsByUser,
  getRelatedProducts,
  getTopRatedProducts,
  getPopularProducts,
  getProductsBySearch,
};
