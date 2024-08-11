const express = require("express");
const { authenticateUser, authorizeRoles } = require("../middleware/fullAuth");
const {
  deleteUser,
  updateUser,
  updateUserRole,
  getUserById,
  getAllUsers,
  updatePassword,
  getUserByEmail,
  getUserByUsername,
  getCurrentUser,
} = require("../controller/user");

const router = express.Router();

router.put("/update-password", authenticateUser, updatePassword);
router.delete("/delete", authenticateUser, deleteUser);
router.put("/update/:id", authenticateUser, updateUser);
router.put(
  "/role/update/:id",
  authenticateUser,
  authorizeRoles("super_admin"),
  updateUserRole
);
router.get("/current-user", authenticateUser, getCurrentUser);
router.get(
  "/by-email",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  getUserByEmail
);
router.get(
  "/by-username",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  getUserByUsername
);

router.get(
  "/:id",
  authenticateUser,
  authorizeRoles("admin", "super_admin"),
  getUserById
);
router.get("/", authenticateUser, authorizeRoles("super_admin"), getAllUsers);

module.exports = router;
