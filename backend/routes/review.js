const express = require("express");
const { addReview, deleteReview } = require("../controller/review");
const { authenticateUser } = require("../middleware/fullAuth");

const router = express.Router();

router.post("/:id/add-review", authenticateUser, addReview);
router.delete("/:id/delete-review", authenticateUser, deleteReview);

module.exports = router;
