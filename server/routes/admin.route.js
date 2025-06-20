const express = require("express");
const { handleAdminLogin } = require("../controllers/admin.controller");

const router = express.Router();

router.post("/login", handleAdminLogin);

module.exports = router;
