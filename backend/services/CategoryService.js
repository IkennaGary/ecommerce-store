const { BadRequestError, UnauthorizedError } = require("../errors");
const { Category, Product } = require("../models");

class CategoryService {
  async addCategory(name, description, image) {
    const isExisting = await Category.findOne({ where: { name: name } });
    if (isExisting) {
      throw new BadRequestError("Category already exists");
    }
    const response = await Category.create({ name, description, image });
    return response;
  }

  async getCategories() {
    const response = await Category.findAll();
    return response;
  }

  async getCategory(id) {
    const response = await Category.findByPk(id, {
      include: [{ model: Product, as: "products" }],
    });

    if (!response) {
      throw new BadRequestError("Category not found");
    }

    return response;
  }

  async updateCategory(id, updatedData) {
    const isExisting = await Category.findByPk(id);
    if (!isExisting) {
      throw new BadRequestError("Category not found");
    }

    await Category.update(updatedData, { where: { id } });
    return "Category updated successfully";
  }

  async deleteCategory(id) {
    const isExisting = await Category.findByPk(id);
    if (!isExisting) {
      throw new BadRequestError("Category not found");
    }

    await Category.destroy({ where: { id } });
    return "Category deleted successfully";
  }
}

const categoryService = new CategoryService();

module.exports = categoryService;
