const Review = require("../model/review.model");
const User = require("../model/user.model");
var mongoose = require("mongoose");

const handleCreateReview = async (req, res) => {
  try {
    const { targetId, targetType, rating, comment } = req.body;

    console.log(targetId);

    if (!targetId || !targetType || !rating) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newReview = new Review({
      user: req.user._id,
      targetId: new mongoose.Types.ObjectId(targetId),
      targetType,
      rating,
      comment,
    });

    const saved = await newReview.save();
    res
      .status(201)
      .json({ message: "Review submitted successfully", review: saved });
  } catch (error) {
    console.error("Error submitting review:", error);
    res.status(500).json({ message: "Server error while submitting review" });
  }
};

const handleGetReviewsForTarget = async (req, res) => {
  try {
    const targetId = req.params.targetId;

    console.log("targetid=", targetId);

    const reviews = await Review.find({ targetId: targetId })
      .populate("user", "name")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Server error while fetching reviews" });
  }
};

module.exports = {
  handleCreateReview,
  handleGetReviewsForTarget,
};
