const express = require("express");
const {
  handleFetchMyListing,
} = require("../controllers/myCarListing.controller");

const router = express.Router();

router.get("/", handleFetchMyListing);

module.exports = router;
