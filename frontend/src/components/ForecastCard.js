import React from "react";
import { Typography, Box } from "@mui/material";

const ForecastCard = ({ forecast }) => {
  return (
    <Box className="forecast-item" sx={{ textAlign: "center", my: 2 }}>
      <Typography variant="h6">
        {new Date(forecast.dt_txt).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </Typography>
      <Typography variant="body2">{`Temperature: ${forecast.main.temp}°C`}</Typography>
      <Typography variant="body2">{`Humidity: ${forecast.main.humidity}%`}</Typography>
      <Typography variant="body2">{`Wind Speed: ${forecast.wind.speed} km/h`}</Typography>
      <img
        src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
        alt="Weather Icon"
        sx={{ width: 50, height: "auto", mt: 1 }}
      />
    </Box>
  );
};

export default ForecastCard;
