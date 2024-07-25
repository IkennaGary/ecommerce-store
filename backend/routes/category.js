const express = require("express");
const {
  addCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const { authenticateUser, authorizeRoles } = require("../middleware/fullAuth");

const router = express.Router();

router.post("/", authenticateUser, authorizeRoles("admin"), addCategory);
router.get("/", getAllCategories);
router.get("/:id", getSingleCategory);
router.put(
  "/update/:id",
  authenticateUser,
  authorizeRoles("admin"),
  updateCategory
);
router.delete(
  "/delete/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteCategory
);

module.exports = router;
