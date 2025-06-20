const express = require("express");
const router = express.Router();
const {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/car.controller");

// Route to get all cars with filtering/sorting
router.get("/", getAllCars);

// Route to get a single car by ID
router.get("/:id", getCarById);

// Routes for future Admin functionality
router.post("/", createCar);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;
