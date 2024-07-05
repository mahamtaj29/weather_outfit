import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import simple from "../images/simple.jpg";
const Login = ({ setIsAuthenticated }) => {
  // State hooks to manage username, password, and message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  // Used navigate hook for navigation
  const navigate = useNavigate();
  // Backend URL for the authentication API
  const backendUrl =
    "https://weather-outfit-backend.vercel.app";
    // Function to handle user login
  const handleLogin = async () => {
    try {
      // Send a POST request to the login endpoint
      const response = await axios.post(`${backendUrl}/api/auth/login`, { username, password });
      setMessage('Login successful');
      // On successful login, set a success message and store the token in localStorage
      localStorage.setItem('token', response.data.token);
      // Set authenticated state to true and navigate to the welcome page
      setIsAuthenticated(true);
      navigate('/welcome');
      // On error, set an error message
    } catch (error) {
      setMessage('Login failed!');
    }
  };
  // Effect hook to verify the token 
  useEffect(() => {
  const verifyToken = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      if (token) {
        // Send a GET request to the verify endpoint with the token in the headers
        const response = await axios.get(`${backendUrl}/api/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // display token verification response and set authenticated state to true
        console.log('Token is valid:', response.data);
        setIsAuthenticated(true);
      }
      // On error, display the error and set authenticated state to false
    } catch (error) {
      console.error('Token verification failed:', error.response ? error.response.data : error.message);
      setIsAuthenticated(false);
    }
  };
  // Call the verifyToken function
    verifyToken();
  }, [setIsAuthenticated]); 

  return (
    // Set background image and styling for the login page
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
    <Container component="main" maxWidth="xs" style={{
          position: "relative", 
          zIndex: 1, 
        }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      > {/* Login form title */}
        <Typography component="h1" variant="h5">
          Login
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
          onClick={handleLogin}
        >
          Login
        </Button>
        {message && <Typography color="error">{message}</Typography>}
      </Box>
    </Container>
    </div>
  );
};

export default Login;
