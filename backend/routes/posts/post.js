const express = require("express");
const {
  authenticateUser,
  authorizeRoles,
} = require("../../middleware/fullAuth");
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  getPostsByCategory,
  getPostsByUser,
  getPopularPosts,
  getPostsBySearch,
} = require("../../controller/posts/post");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  createPost
); // Add product

router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  updatePost
); // Update product

router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  deletePost
); // Delete product

// Specific Product Routes
router.get("/category/:id", getPostsByCategory); // Get posts by category
router.get("/user/:id", authenticateUser, getPostsByUser); // Get products by user

// Special Product Queries
router.get("/popular", getPopularPosts); // Get popular products

router.get("/search", getPostsBySearch); // Search products

// General Product Routes
router.get("/:id", getPost); // Get a single product by ID
router.get("/", getPosts);

module.exports = router;
