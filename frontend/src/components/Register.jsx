import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import axios from "axios";
import simple from "../images/simple.jpg";
const Register = () => {
  // State hooks to manage username, password, and message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  // Backend URL for the registration API endpoint
  const backendUrl = "https://weather-outfit-backend.vercel.app";
  // Function to handle user registration
  const handleRegister = async () => {
    try {
      // Send a POST request to the registration endpoint
      await axios.post(`${backendUrl}/api/auth/register`, {
        username,
        password,
      });
      setMessage("Registration successful. Please log in.");
    } catch (error) {
      // On error, set an error message
      const errorMessage = error.response?.data?.message || "An error occurred during registration.";
      setMessage("Registration failed: " + errorMessage);
      console.log(errorMessage);
    }
  };

  return (
    //background image and styling for the registration page
    <div style={{
      backgroundImage: `url(${simple})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      transition: "background-image 0.5s ease-in-out",
  }}>
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          InputProps={{
            style: {
              color: 'black',
            },
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: {
              color: 'black',
            },
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleRegister}
        >
          Register
        </Button>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
    </Container>
    </div>
  );
};

export default Register;
