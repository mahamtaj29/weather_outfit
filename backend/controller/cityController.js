// backend/controller/cityController.js
const City = require("../models/cityModel");

const addCity = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id; // Assuming req.user is populated by the auth middleware

  try {
    const newCity = new City({ name, user: userId });
    await newCity.save();
    res.status(201).json({ message: "City saved successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving city", error: error.message });
  }
};

const getCities = async (req, res) => {
  const userId = req.user._id;

  try {
    const cities = await City.find({ user: userId });
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res
      .status(500)
      .json({ message: "Error fetching cities", error: error.message });
  }
};

module.exports = { addCity, getCities };
