const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const { Category, Product } = require("../models");
const { createReviewValidator } = require("../validators/review");
const ReviewService = require("../services/ReviewService");
const ProductService = require("../services/ProductService");

const addReview = async (req, res) => {
  const { rating } = req.body;
  const { id: productId } = req.params;
  const { id: userId } = req.user;
  if (!rating || !productId) {
    throw new BadRequestError("rating and productId are required");
  }
  req.body.productId = Number(productId);
  req.body.userId = userId;

  validatorResponse = createReviewValidator(req.body);

  if (validatorResponse !== true) {
    throw new BadRequestError(validatorResponse[0]?.message);
  }

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    const comment = req.body.comment || "";

    const data = {
      productId,
      userId,
      rating,
      comment,
    };

    const response = await ReviewService.addReview(data);

    await Product.update(
      { reviewId: response.id, rating: response.rating },
      {
        where: { id: productId },
      }
    );

    await ProductService.incrementPopularity(productId);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Review created successfully",
      review: response,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new BadRequestError("id is required");
  }

  try {
    const review = await ReviewService.deleteReview(id);
    res.status(StatusCodes.OK).json({ success: true, message: review });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
};

module.exports = {
  addReview,
  deleteReview,
};
