const express = require("express");
const {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/category");
const { authenticateUser } = require("../middleware/fullAuth");

const router = express.Router();

router.post("/", authenticateUser, createCategory);
router.get("/", getAllCategory);
router.get("/:id", getSingleCategory);
router.put("/:id", authenticateUser, updateCategory);
router.delete("/:id", authenticateUser, deleteCategory);

module.exports = router;
