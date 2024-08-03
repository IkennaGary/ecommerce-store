const express = require("express");
const {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
  updateOrderStatus,
} = require("../controller/order");
const { authenticateUser, authorizeRoles } = require("../middleware/fullAuth");

const router = express.Router();

router.get("/user", authenticateUser, getUserOrders);
router.put(
  "/update-status/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  updateOrderStatus
);

router.post("/", authenticateUser, createOrder);
router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  getAllOrders
);
router.get("/:id", authenticateUser, getOrderById);
module.exports = router;
