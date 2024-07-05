import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState, useEffect } from "react";
import theme from "../src/components/theme";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/Register";
import Welcome from "./components/Welcome";
import { Navigate } from "react-router-dom";
import CityList from "./components/CityList";

function App() {
  // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const backendUrl = "https://weather-outfit-backend.vercel.app";
  // Verify the token on initial load (if token exists)
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`${backendUrl}/api/auth/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.status === 200) {
            console.log("Token is valid");
          } else {
            console.log("Token is invalid");
          }
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
      {/* Router Wrap entire application with Router */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Pass authentication state to Navbar */}
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        {/* Define routes for the application */}
        <Routes>
          <Route path="/" element={<WeatherCard />} />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route
            path="/cities"
            element={isAuthenticated ? <CityList /> : <Navigate to="/login" />}
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;
