// src/components/Login.jsx
import React, { useState, useEffect } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', { username, password });
      setMessage('Login successful');
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/welcome');
    } catch (error) {
      setMessage('Login failed, If you are new User, try registration first: ');
    }
  };
  useEffect(() => {
  const verifyToken = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.get('http://localhost:8000/api/auth/verify', {
          //{ Authorization: token }
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Token is valid:', response.data);
        //new step
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Token verification failed:', error.response ? error.response.data : error.message);
      setIsAuthenticated(false);
      //navigate('/login'); // Redirect to login if token verification fails
    }
  };
    verifyToken();
  }, [setIsAuthenticated]); 

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
        {/* Link to navigate to /welcome */}
        <Link to="/welcome" variant="body2">
          Go to Welcome Page
        </Link>
      </Box>
    </Container>
  );
};

export default Login;
