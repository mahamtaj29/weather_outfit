// backend/routes/cityRoute.js
const express = require("express");
const passport = require("passport");
const { addCity, getCities } = require("../controller/cityController");

const router = express.Router();

// Route to add a city, protected by passport authentication
router.post("/", passport.authenticate("jwt", { session: false }), addCity);
router.get("/", passport.authenticate("jwt", { session: false }), getCities);

module.exports = router;
