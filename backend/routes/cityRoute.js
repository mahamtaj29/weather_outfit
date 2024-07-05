// backend/routes/cityRoute.js
const express = require("express");
const passport = require("passport");
// Import controller functions for handling city operations
const { addCity, getCities } = require("../controller/cityController");
// Create an instance of Express Router to define routes
const router = express.Router();

// Route to add a city, protected by passport authentication
router.post("/", passport.authenticate("jwt", { session: false }), addCity);
// Route to get all cities, protected by passport authentication
router.get("/", passport.authenticate("jwt", { session: false }), getCities);

module.exports = router;
