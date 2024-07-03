import React from "react";
import { Grid } from "@mui/material";
import ForecastCard from "./ForecastCard";

const WeatherForecast = ({ forecasts }) => {
  return (
    <div>
      <h3> Weather Forecast of coming days: </h3>
      <Grid container spacing={2} justifyContent="center">
        {forecasts.map((forecast, index) => (
          <Grid item key={index}>
            <ForecastCard forecast={forecast} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default WeatherForecast;
