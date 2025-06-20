const express = require("express");
const {
  handleAdminLogin,
  handleGetAllUsers,
  handleGetAllCarListings,
} = require("../controllers/admin.controller");
const { approveTo } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", handleAdminLogin);

router.get("/users", approveTo(["ADMIN"]), handleGetAllUsers);
router.get("/listings", approveTo(["ADMIN"]), handleGetAllCarListings);

module.exports = router;
