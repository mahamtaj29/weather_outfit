// Import City model for database operations
const City = require("../models/cityModel");
// Controller function to add a city to the user's favorites
const addCity = async (req, res) => {
  const { name } = req.body;
  const userId = req.user._id;

  try {
    // Create a new City instance with name and user ID
    const newCity = new City({ name, user: userId });
    await newCity.save();
    res.status(201).json({ message: "City saved successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving city", error: error.message });
  }
};
// Controller function to fetch all cities belonging to the user
const getCities = async (req, res) => {
  const userId = req.user._id;
  try {
    // Find all cities in the database that belong to the user
    const cities = await City.find({ user: userId });
    // Respond with the list of cities
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res
      .status(500)
      .json({ message: "Error fetching cities", error: error.message });
  }
};

module.exports = { addCity, getCities };
