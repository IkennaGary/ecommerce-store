const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { Category, Product } = require("../models");
const { createCategoryValidator } = require("../validators/category");
const CategoryService = require("../services/CategoryService");

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
    const response = await CategoryService.addCategory(
      name,
      description,
      image
    );

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

const getAllCategories = async (req, res) => {
  try {
    const response = await CategoryService.getCategories();
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
    const response = CategoryService.getCategory(id);
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

  validatorResponse = createCategoryValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const response = await CategoryService.updateCategory(id, req.body);
    res.status(StatusCodes.OK).json({
      success: true,
      message: response,
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

    const response = await CategoryService.deleteCategory(id);
    res.status(StatusCodes.OK).json({
      success: true,
      message: response,
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
