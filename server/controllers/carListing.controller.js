const CarListingModel = require("../model/carListing.model");

const handleAddCarListing = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      make,
      model,
      year,
      mileage,
      condition,
      description,
      specifications,
      imageUrl,
    } = req.body;

    const estimatePrice = (year, mileage, condition) => {
      let base = 500000;
      const age = new Date().getFullYear() - year;

      if (age > 5) base -= 50000 * (age - 5);
      if (mileage > 100000) base -= 50000;

      if (condition === "Fair") base -= 20000;
      if (condition === "Poor") base -= 40000;

      return Math.max(50000, base);
    };

    const price = estimatePrice(year, mileage, condition);

    const car = await CarListingModel.create({
      userId,
      name,
      make,
      model,
      year,
      mileage,
      condition,
      price,
      description,
      specifications,
      imageUrl,
    });

    res.status(201).json({
      msg: "Car listed successfully",
      car,
    });
  } catch (err) {
    console.error("Error adding car listing:", err.message);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  handleAddCarListing,
};
