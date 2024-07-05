const passport = require("passport");
const express = require("express");
// Create an instance of Express Router to define routes
const router = express.Router();
// Import controller functions for handling authentication
const {
  register,
  login,
  verifyToken,
} = require("../controller/authController");
// Defined routes for authentication
router.post("/register", register);
router.post("/login", login);
router.get("/verify", verifyToken);

module.exports = router;
