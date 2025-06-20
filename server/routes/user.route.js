const express = require("express");
const {
  handleUserSignUp,
  handleUserLogin,
  handleGetUserProfile,
  handleUserLogout,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/signup", handleUserSignUp);
router.post("/login", handleUserLogin);
router.get("/profile", handleGetUserProfile);
router.post("/logout", handleUserLogout);

module.exports = router;
