const express = require("express");
const {
  handleBookAppointment,
} = require("../controllers/appointment.controller");

const router = express.Router();

router.post("/", handleBookAppointment);

module.exports = router;
