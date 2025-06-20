const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  if (!req.user) return res.json({ msg: "log in to see your car listing" });

  // const carListing = carListingModel.find({created by: }) // it will be used to fetch only the car  listing by specific user

  res.json({ msg: "your car listing" });
});

module.exports = router;
