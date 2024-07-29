const express = require("express");
const { authenticateUser } = require("../../middleware/fullAuth");
const {
  likePost,
  dislikePost,
  getLikesDislikes,
} = require("../../controller/posts/likeDislike");

const router = express.Router();

router.post("/like/:id", authenticateUser, likePost);
router.post("/dislike/:id", authenticateUser, dislikePost);
router.get("/:id", authenticateUser, getLikesDislikes);

module.exports = router;
