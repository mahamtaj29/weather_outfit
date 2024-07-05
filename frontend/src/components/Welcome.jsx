import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import welcome from "../images/welcome.jpg";
// Welcome component
const Welcome = () => {
  // State hooks to manage city and message
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  // Backend URL for the city saving API
  const backendUrl =
    "https://weather-outfit-backend.vercel.app";
  // Function to handle changes in the city input field
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };
  // Function to handle city submission
  const handleCitySubmit = async () => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      // Send a POST request to save the city with the token in the headers
      const response = await axios.post(`${backendUrl}/api/cities`, { name: city }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("Token is valid");
      } else {
        console.log("Token is invalid");
      }
      // Set a success message and clear the city input
      setMessage('City saved successfully!');
      setCity('');
    } catch (error) {
      // On error, log the error and set an error message
      console.error('Error saving city:', error);
      setMessage('Error saving city');
    }
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${welcome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        transition: "background-image 0.5s ease-in-out",
      }}
    >
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: 'black',
        }}
      >
        <Typography variant="h4" gutterBottom>
        Welcome
      </Typography>
        <Typography variant="body1">
          Successfully logged in. 
          Please enter your favoirite cities!
        </Typography>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="city"
          label="Favorite City"
          name="city"
          autoComplete="city"
          autoFocus
          value={city}
          onChange={handleCityChange}
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
          onClick={handleCitySubmit}
        >
          Save City
        </Button>
        {message && <Typography color="error">{message}</Typography>}
        <Typography variant="body1">
          Or
        </Typography>
        <Box mt={2}>
        <Link to="/cities">
          <Button variant="contained">View Favorite Cities</Button>
        </Link>
        </Box>
      </Box>
    </Container>
    </Box>
  );
};

export default Welcome;
