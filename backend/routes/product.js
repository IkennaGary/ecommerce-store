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

router.post("/", authenticateUser, authorizeRoles("admin"), addProduct);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("admin"),
  updateProduct
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteProduct
);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/user/:userId", getProductsByUser);
router.get("/related/:id", getRelatedProducts);
router.get("/top-rated", getTopRatedProducts);
router.get("/popular", getPopularProducts);
router.get("/search", getProductsBySearch);

module.exports = router;
