const express = require("express");
const { handleAddCarListing } = require("../controllers/carListing.controller");

const router = express.Router();

router.post("/", handleAddCarListing);

module.exports = router;
