import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const backendUrl =
    "https://weather-outfit-backend-duppuv4s1-maham-tajs-projects.vercel.app";
  
  const handleRegister = async () => {
    try {
      await axios.post(`${backendUrl}/api/auth/register`, {
        username,
        password,
      });
      setMessage("Registration successful. Please log in.");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred during registration.";
      setMessage("Registration failed: " + error.response.data.message);
      console.log(errorMessage);
    }
  };

  return (
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
  );
};

export default Register;
