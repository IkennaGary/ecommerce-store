const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { BlogCategory, Post } = require("../models");
const CategoryService = require("../services/CategoryService");

const addCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    throw new BadRequestError("Name field required");
  }
  try {
    const isExisting = await BlogCategory.findOne({ where: { name: name } });
    if (isExisting) {
      throw new BadRequestError("Category already exists");
    }
    const response = await BlogCategory.create({ name });

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
    const response = await BlogCategory.findAll();
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
      include: [{ model: Post, as: "posts" }],
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
  try {
    const isExisting = await BlogCategory.findByPk(id);
    if (!isExisting) {
      throw new BadRequestError("Category not found");
    }

    await BlogCategory.update(updatedData, { where: { id } });
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
    const isExisting = await BlogCategory.findByPk(id);
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
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
