const express = require("express");
const {
  handleAddServiceProvider,
  handleSearchServiceProviders,
} = require("../controllers/serviceProvider.controller");

const router = express.Router();

router.post("/", handleAddServiceProvider);

router.post("/search", handleSearchServiceProviders);

module.exports = router;
