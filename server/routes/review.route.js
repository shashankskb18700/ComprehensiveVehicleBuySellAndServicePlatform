const express = require("express");
const {
  handleCreateReview,
  handleGetReviewsForTarget,
} = require("../controllers/review.controller");

const router = express.Router();

router.post("/", handleCreateReview);

router.get("/:targetId", handleGetReviewsForTarget);

module.exports = router;
