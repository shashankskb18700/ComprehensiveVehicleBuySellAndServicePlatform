const CarListingModel = require("../model/carListing.model");

const handleFetchMyListing = async (req, res) => {
  try {
    const userId = req.user._id;

    const myCars = await CarListingModel.find({ userId });

    res.status(200).json(myCars);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your car listings." });
  }
};

module.exports = { handleFetchMyListing };
