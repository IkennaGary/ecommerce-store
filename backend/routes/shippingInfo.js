const express = require("express");
const {
  addShippingAddress,
  getShippingAddresses,
  updateShippingAddress,
  deleteShippingAddress,
  setAsDefaultAddress,
  addShippingMethod,
  getShippingMethods,
  updateShippingMethod,
  deleteShippingMethod,
} = require("../controller/shippingInfo");
const { authenticateUser } = require("../middleware/fullAuth");

const router = express.Router();

router.post("/address", authenticateUser, addShippingAddress);
router.get("/address", authenticateUser, getShippingAddresses);
router.put("/address/:id", authenticateUser, updateShippingAddress);
router.delete("/address/:id", authenticateUser, deleteShippingAddress);
router.put("/address/:id/default", authenticateUser, setAsDefaultAddress);

router.post("/method", authenticateUser, addShippingMethod);
router.get("/method", authenticateUser, getShippingMethods);
router.put("/method/:id", authenticateUser, updateShippingMethod);
router.delete("/method/:id", authenticateUser, deleteShippingMethod);

module.exports = router;
