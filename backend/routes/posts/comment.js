const express = require("express");
const { authenticateUser } = require("../../middleware/fullAuth");
const {
  addComment,
  deleteComment,
  getComments,
} = require("../../controller/posts/comment");

const router = express.Router();

router.post("/", authenticateUser, addComment);
router.get("/:id", authenticateUser, getComments);
router.delete("/delete/:id", authenticateUser, deleteComment);

module.exports = router;
