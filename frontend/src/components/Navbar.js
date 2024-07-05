import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    // AppBar is the main container for the Navbar
    <AppBar position="static">
      <Toolbar>
        {/* Toolbar contains the main content of the Navbar */}
        {/*  <IconButton edge="start" color="inherit" aria-label="menu">
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Weather & Dress Recommendation Dashboard
        </Typography>
        {/* Button to navigate to Home page */}
        <Button component={RouterLink} to="/" color="inherit">
          Home
        </Button>
        {/* Conditional rendering based on isAuthenticated prop */}
        {!isAuthenticated ? (
          // Display Login and Register buttons if not authenticated
          <>
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
            <Button component={RouterLink} to="/register" color="inherit">
              Register
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
