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
} = require("../controller/product");

const router = express.Router();

router.post("/", authenticateUser, authorizeRoles("admin"), addProduct); // Add product
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("admin"),
  updateProduct
); // Update product
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("admin"),
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

// General Product Routes
router.get("/:id", getProduct); // Get a single product by ID
router.get("/", getAllProducts);
module.exports = router;
