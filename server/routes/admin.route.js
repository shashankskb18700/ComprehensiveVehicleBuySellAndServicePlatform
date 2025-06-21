const express = require("express");
const {
  handleAdminLogin,
  handleGetAllUsers,
  handleGetAllCarListings,
  handleFetchServiceProvider,
  handleFetchTransaction,
  handleFetchTransactionById,
} = require("../controllers/admin.controller");
const { approveTo } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/login", handleAdminLogin);

router.get("/users", approveTo(["ADMIN"]), handleGetAllUsers);
router.get("/listings", approveTo(["ADMIN"]), handleGetAllCarListings);
router.get("/providers", handleFetchServiceProvider);
router.get("/transactions", handleFetchTransaction);
router.get("/transactions/:id", handleFetchTransactionById);

module.exports = router;
