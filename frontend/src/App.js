import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { ThemeProvider } from "@mui/material/styles";
//import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useEffect } from "react";
import theme from "../src/components/theme";
import Navbar from "./components/Navbar";
//import sky from "./images/sky.jpg";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
//import Home from "./components/Home";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import { Navigate } from "react-router-dom";
import CityList from "./components/CityList";

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verify the token on initial load (if token exists)
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            "http://localhost:5000/api/auth/verify",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setIsAuthenticated(true);
        } catch (error) {
          setIsAuthenticated(false);
        }
      }
    };

    verifyToken();
  }, []);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };
  return (
    <Router>
      {" "}
      {/* Wrap your entire application with Router */}
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {/* <Box
          className="sky"
          style={{
            backgroundImage: `url(${sky})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            //alignItems: "center",
          }}
        > */}
        {/* Pass authentication state to Navbar */}
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          {/* Home route for login and signup */}
          <Route path="/" element={<WeatherCard />} />
          {/* <Route path="/weather" element={<WeatherCard />} /> */}
          {/* Weather route, only accessible if authenticated */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/welcome"
            element={<Welcome />}
            //element={isAuthenticated ? <Welcome /> : <Navigate to="/login" />}
          />
          <Route
            path="/cities"
            element={isAuthenticated ? <CityList /> : <Navigate to="/login" />}
          />
        </Routes>
        {/* </Box> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
