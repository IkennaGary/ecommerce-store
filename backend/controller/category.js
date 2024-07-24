const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { Category, Product } = require("../models");
const { createCategoryValidator } = require("../validators/category");

const addCategory = async (req, res) => {
  const { name, description, image } = req.body;

  if (!name || !description || !image) {
    throw new BadRequestError("All fields are required");
  }

  validatorResponse = createCategoryValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const isExisting = await Category.findOne({ where: { name: name } });
    if (isExisting) {
      throw new BadRequestError("Category already exists");
    }
    const response = await Category.create(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Category created successfully",
      category: response,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const response = await Category.findAll();
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Categories retrieved successfully",
      categories: response,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const getSingleCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("id is required");
  }
  try {
    const response = await Category.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });
    if (!response) {
      throw new BadRequestError("Category not found");
    }
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Category retrieved successfully",
      category: response,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("id is required");
  }
  const { name, description, image } = req.body;

  if (name || description || image) {
    validatorResponse = createCategoryValidator(req.body);

    if (validatorResponse !== true) {
      throw new BadRequestError(validatorResponse[0]?.message);
    }
  }

  try {
    const isExisting = await Category.findByPk(id);
    if (!isExisting) {
      throw new BadRequestError("Category not found");
    }

    await Category.update(req.body, { where: { id } });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const isExisting = await Category.findByPk(id);
    if (!isExisting) {
      throw new BadRequestError("Category not found");
    }

    await Category.destroy({ where: { id } });
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
