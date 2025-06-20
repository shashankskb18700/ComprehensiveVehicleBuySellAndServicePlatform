const mongoose = require("mongoose");

const carListingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    name: { type: String, required: true }, // New: For display
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    mileage: { type: Number, required: true },
    condition: {
      type: String,
      enum: ["Excellent", "Good", "Fair", "Poor"],
      required: true,
    },
    price: { type: Number, required: true },
    description: { type: String },
    specifications: { type: String },
    imageUrl: { type: String },
  },
  {
    timestamps: true,
  }
);

const CarListingModel = mongoose.model("carlisting", carListingSchema);
module.exports = CarListingModel;
