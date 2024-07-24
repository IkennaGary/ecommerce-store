const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/fullAuth");
const {
  addProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
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

module.exports = router;
