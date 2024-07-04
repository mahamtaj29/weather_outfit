// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
//import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Weather & Dress Recommendation Dashboard
        </Typography>
        <Button component={RouterLink} to="/" color="inherit">
          Home
        </Button>
        {!isAuthenticated ? (
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
