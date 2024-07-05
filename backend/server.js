// Load environment variables from .env file into process.env
require("dotenv").config();
// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
// Import routes for authentication
const authRoutes = require("./routes/authRoute");
// Import routes for city data
const cityRoutes = require("./routes/cityRoute");
// Import Passport configuration
const passportConfig = require("./middleware/passportConfig");
// Cross-Origin Resource Sharing middleware
const cors = require("cors");

// Create an instance of Express application
const app = express();
const PORT = process.env.PORT || 8000;
//Initialize passport configuration
passportConfig(passport);

// Define CORS options
const corsOptions = {
  // Allow requests from any origin
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  optionsSuccessStatus: 200,
  credentials: true, // Enable CORS credentials
};
// Use the CORS middleware with the defined options
app.use(cors());
app.use(cors(corsOptions));
// Middleware to parse JSON bodies of incoming requests
app.use(express.json());
// Initialize Passport and configure it to use session-based authentication
app.use(passport.initialize());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);

// MongoDB connection setup
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Start the Express server once MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`App running on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection error", error);
  });
