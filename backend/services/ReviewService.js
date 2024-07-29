const { Op } = require("sequelize");
const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors");
const { Product, Review, User } = require("../models");

class ReviewService {
  async addReview(data) {
    const existingReview = await Review.findOne({
      where: { productId: data.productId, userId: data.userId },
    });
    if (existingReview) {
      throw new BadRequestError("You have already reviewed this product");
    }
    const response = await Review.create(data);

    return response;
  }

  async deleteReview(id) {
    const review = await Review.findByPk(id);

    if (!review) {
      throw new NotFoundError("Review not found");
    }

    await review.destroy();

    return "Review deleted successfully";
  }
}

const reviewService = new ReviewService();

module.exports = reviewService;
