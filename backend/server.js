require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const authRoutes = require("./routes/authRoute");
const cityRoutes = require("./routes/cityRoute");
const passportConfig = require("./middleware/passportConfig");
const cors = require("cors");
const app = express();

//Initialize passport configuration
passportConfig(passport);

// Define allowed origins
const allowedLinks = ["http://localhost:3001", "http://localhost:3000"];

// Define CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedLinks.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS violation"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};

// // Use the CORS middleware with the defined options
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/cities", cityRoutes);

// Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`App running on PORT ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Connection error", error);
  });
