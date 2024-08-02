const express = require("express");
const {
  createPaymentMethod,
  getPaymentMethods,
  updatePaymentMethod,
  deletePaymentMethod,
} = require("../controller/paymentMethod");
const { authenticateUser, authorizeRoles } = require("../middleware/fullAuth");

const router = express.Router();

router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  createPaymentMethod
);
router.get("/", getPaymentMethods);
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  updatePaymentMethod
);
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  deletePaymentMethod
);

module.exports = router;
