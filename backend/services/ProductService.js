const { Op } = require("sequelize");
const { BadRequestError, UnauthorizedError } = require("../errors");
const { Product, Category, User } = require("../models");

class ProductService {
  async addProduct(data) {
    const { id: categoryId } = await Category.findOne({
      where: { name: data.category },
    });
    if (!categoryId) {
      throw new BadRequestError("Invalid category");
    }

    data.categoryId = categoryId;

    const existingProduct = await Product.findOne({
      where: { title: data.title, categoryId },
    });

    if (existingProduct) {
      throw new BadRequestError("Product already exists in this category");
    }

    const response = await Product.create(data);

    return response;
  }

  async getAllProducts(page, limit, sortBy, sortDirection, params) {
    const offset = (page - 1) * limit;
    const order = [[sortBy, sortDirection]];
    const pageParams = { limit, page, offset };
    const { minPrice, maxPrice } = params;

    if (minPrice !== undefined && maxPrice !== undefined) {
      params.price = {
        [Op.between]: [minPrice, maxPrice],
      };
    } else if (minPrice !== undefined) {
      params.price = {
        [Op.gte]: minPrice,
      };
    } else if (maxPrice !== undefined) {
      params.price = {
        [Op.lte]: maxPrice,
      };
    }
    delete params.maxPrice;
    delete params.minPrice;
    delete params.page;
    delete params.limit;

    const products = await Product.findAll({
      limit,
      offset,
      order,
      where: params,
    });

    return { products, pageParams };
  }

  async getProduct(id) {
    const response = await Product.findByPk(id);
    if (!response) {
      throw new BadRequestError("Product not found");
    }
    return response;
  }

  async updateProduct(id, data) {
    if (data.category) {
      const { id: categoryId } = await Category.findOne({
        where: { name: data.category },
      });

      if (!categoryId) {
        throw new BadRequestError("Invalid category");
      }

      data.categoryId = categoryId;
    }

    const existingProduct = await Product.findByPk(id);

    if (!existingProduct) {
      throw new BadRequestError("Product doesn't exist");
    }
    await Product.update(data, { where: { id } });

    return "Product updated successfully";
  }

  async deleteProduct(id) {
    const response = await Product.findByPk(id);

    if (!response) {
      throw new BadRequestError("Product not found");
    }

    await Product.destroy({ where: { id } });

    return "Product deleted successfully";
  }

  async getProductsByCategory(id, page, limit, sortBy, sortDirection, params) {
    const offset = (page - 1) * limit;
    const order = [[sortBy, sortDirection]];

    const pageParams = { limit, page, offset };
    params.id = id;

    delete params.page;
    delete params.limit;

    const products = await Product.findAll({
      limit,
      offset,
      order,
      where: { categoryId: params.id },
    });

    return { products, pageParams };
  }

  async countRecords(data) {
    const response = await Product.count({ where: data });
    return response;
  }

  async getProductsByUser(userId, page, limit, sortBy, sortDirection, params) {
    const offset = (page - 1) * limit;
    const order = [[sortBy, sortDirection]];

    const pageParams = { limit, page, offset };
    params.userId = userId;

    delete params.page;
    delete params.limit;

    const products = await Product.findAll({
      limit,
      offset,
      order,
      where: params,
    });

    return { products, pageParams };
  }

  async getRelatedProducts(productId, categoryId, limit) {
    const relatedProducts = await Product.findAll({
      limit,
      where: { id: { [Op.not]: productId }, categoryId },
    });

    return relatedProducts;
  }

  async getTopRatedProducts(limit) {
    const popularProducts = await Product.findAll({
      limit,
      order: [[{ model: Review, as: "reviews" }, "rating", "DESC"]],
    });

    return popularProducts;
  }

  async getPopularProducts(limit) {
    const popularProducts = await Product.findAll({
      limit,
      order: [["popularity", "DESC"]],
    });
    return popularProducts;
  }

  async incrementPopularity(id) {
    try {
      const product = await Product.findByPk(id);
      if (product) {
        product.popularity += 1;
        await product.save();
      }
    } catch (error) {
      console.error("Error incrementing popularity:", error);
    }
  }

  async searchProducts(searchTerm) {
    const searchQuery = `%${searchTerm}%`;
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: searchQuery } },
          { description: { [Op.like]: searchQuery } },
          { price: { [Op.like]: searchQuery } },
          { category: { [Op.like]: searchQuery } },
          { sku: { [Op.like]: searchQuery } },
          { brand: { [Op.like]: searchQuery } },
        ],
      },
    });

    return products;
  }

  // Apply this seqrch query in case of pagination
  // async searchProducts(searchTerm, page, limit, sortBy, sortDirection) {
  //   const offset = (page - 1) * limit;
  //   const order = [[sortBy, sortDirection]];

  //   const searchQuery = `%${searchTerm}%`;
  //   const products = await Product.findAll({
  //     limit,
  //     offset,
  //     order,
  //     where: {
  //       [Op.or]: [
  //         { title: { [Op.like]: searchQuery } },
  //         { description: { [Op.like]: searchQuery } },
  //         { price: { [Op.like]: searchQuery } },
  //         { category: { [Op.like]: searchQuery } },
  //         { sku: { [Op.like]: searchQuery } },
  //         { brand: { [Op.like]: searchQuery } },
  //       ],
  //     },
  //   });

  //   return products;
  // }
}

const productService = new ProductService();

module.exports = productService;
