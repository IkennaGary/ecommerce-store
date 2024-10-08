const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/fullAuth");
const {
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
  getProductReviews,
} = require("../controller/product");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  addProduct
); // Add product
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  updateProduct
); // Update product
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  deleteProduct
); // Delete product

// Specific Product Routes
router.get("/category/:categoryId", getProductsByCategory); // Get products by category
router.get("/user/:userId", authenticateUser, getProductsByUser); // Get products by user

// Special Product Queries
router.get("/related/:id", getRelatedProducts); // Get related products
router.get("/popular", getPopularProducts); // Get popular products
router.get("/top-rated", getTopRatedProducts); // Get top-rated products
router.get("/search", getProductsBySearch); // Search products

router.get("/reviews/:id", getProductReviews); // Get product reviews

// General Product Routes
router.get("/:id", getProduct); // Get a single product by ID
router.get("/", getAllProducts);

module.exports = router;
