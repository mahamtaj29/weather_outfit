import React, { useState } from "react";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import WeatherForecast from "./WeatherForecast";
import Recommendations from "./Recommendations";
import genEmoji from "../utils/genEmoji";
import UnitToggle from "./UnitToggle";
import Loading from "./Loading";

const WeatherCard = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [temperatureUnit, setTemperatureUnit] = useState("metric");
  const [loading, setLoading] = useState(false);

  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Unauthorized - Please check your API key");
        } else if (response.status === 404) {
          throw new Error("City not found");
        } else {
          throw new Error("Failed to fetch weather data");
        }
      }
      const data = await response.json();
      setWeatherData(data);

      const forecastResponse = await fetch(
        `${forecastUrl}?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!forecastResponse.ok) {
        if (forecastResponse.status === 401) {
          throw new Error("Unauthorized - Please check your API key");
        } else if (forecastResponse.status === 404) {
          throw new Error("Forecast data not available");
        } else {
          throw new Error("Failed to fetch forecast data");
        }
      }

      const forecastData = await forecastResponse.json();
      const forecasts = forecastData.list.filter(
        (item, index) => index % 8 === 0
      );
      setForecastData(forecasts);
    } catch (error) {
      console.error("Error fetching data:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTemperatureUnitChange = (unit) => {
    setTemperatureUnit(unit);
  };

  const convertTemperature = (temp) => {
    if (temperatureUnit === "imperial") {
      return `${Math.round((temp * 9) / 5 + 32)}°F`;
    } else {
      return `${Math.round(temp)}°C`;
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <TextField
          id="search-input"
          label="Enter a city name"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          id="search-button"
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ mb: 2 }}
        >
          Search
        </Button>
        {loading && <Loading />}
        {weatherData && !loading && (
          <Box id="weather-container" sx={{ textAlign: "center" }}>
            <Typography variant="h4" component="h2" sx={{ mt: 2 }}>
              {weatherData.name}
            </Typography>
            <Typography variant="body1">
              {`Temperature: ${convertTemperature(weatherData.main.temp)}`}
              <UnitToggle
                unit={temperatureUnit}
                onUnitChange={handleTemperatureUnitChange}
              />
            </Typography>
            <Typography variant="body1">{`Humidity: ${weatherData.main.humidity}%`}</Typography>
            <Typography variant="body1">{`Wind Speed: ${weatherData.wind.speed} km/h`}</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              {genEmoji(weatherData.weather[0].icon)}{" "}
              {weatherData.weather[0].description}
            </Typography>
          </Box>
        )}
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Recommendations weatherData={weatherData} />
        {forecastData && <WeatherForecast forecasts={forecastData} />}
      </Box>
    </Container>
  );
};

export default WeatherCard;
