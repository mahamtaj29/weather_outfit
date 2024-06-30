import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Welcome = () => {
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleCitySubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/api/cities', { name: city }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('City saved successfully!');
      setCity('');
    } catch (error) {
      console.error('Error saving city:', error);
      setMessage('Error saving city');
    }
  };

  return (
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
          You are logged in. Please write your favoirite cities to see weather forcast!
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
        <Box mt={2}>
        <Link to="/cities">
          <Button variant="contained">View Favorite Cities</Button>
        </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Welcome;
