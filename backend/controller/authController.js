const User = require("../models/userModel");
// Import bcryptjs for hashing passwords
const bcrypt = require("bcryptjs");
// Import jsonwebtoken for generating and verifying JWTs
const jwt = require("jsonwebtoken");
// Function to handle user registration
const register = async (req, res) => {
  // Extract username and password from request body
  const { username, password } = req.body;

  try {
    // Validate that password is provided
    if (!password) throw new Error("Password is required");
    // Hash the password using bcrypt with salt rounds = 10
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record in the database with hashed password
    await User.create({ password: hashedPassword, username });
    // Respond with success message
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};
// Function to handle user login
const login = async (req, res) => {
  // Extract username and password
  const { username, password } = req.body;
  try {
    // Validate that both username and password are provided
    if (!password || !username)
      throw new Error("Password & username is required");
    // Find user in the database by username
    const user = await User.findOne({ username });
    // If user is not found, respond with error message
    if (!user) return res.status(400).json({ message: "Credentials Invalid" });
    // Compare hashed password from request with hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      // If passwords don't match, respond with error message
      return res.status(400).json({ message: "Credentials Invalid" });
    // Validate that JWT secret is defined in environment variable.
    if (!process.env.JWT_SECRET) throw new Error("JWT secret is not defined");
    // Generate JWT token with user ID and username as payload
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    // Respond with JWT token
    res.json({ token });
  } catch (error) {
    console.error("Registration error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};
// Function to verify JWT token
const verifyToken = (req, res) => {
  // Extract Authorization header from request
  const authHeader = req.headers.authorization;
  // Extract JWT token from Authorization header
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "no token provided" });
  }

  try {
    // Verify JWT token using JWT_SECRET from environment variables
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({
      // If token is valid, respond with success message and decoded user information
      message: "Token is valid",
      user: {
        id: decode.id,
        username: decode.username,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { register, login, verifyToken };
