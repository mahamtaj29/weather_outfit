import React from "react";
import { Typography, Grid, Card } from "@mui/material";
import genHatMsg from "../utils/genHatMsg";
import genShoesMsg from "../utils/genShoesMsg";
import genAccessories from "../utils/genAccessories";
import genClothing from "../utils/genClothing";
import genCoatMsg from "../utils/genCoatMsg";

const Recommendations = ({ weatherData }) => {
  if (!weatherData) return null;

  //const { weather, wind } = weatherData;
  const { main, weather, wind } = weatherData;
  const lowestTemp = main.temp_min;
  //const highestTemp = main.temp_max;
  //const precipType = weather[0].main;
  const windSpeed = wind.speed;
  const weatherDescription = weather[0].description;
  const humidity = main.humidity;
  const rain = weatherData.rain;
  const rainIntensity = rain ? rain["1h"] || rain["3h"] || 0 : 0;

  return (
    <Grid sx={{ mt: 4 }} style={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{ maxWidth: 500, backgroundColor: "transparent", shadowOpacity: 0 }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Recommendations:
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Hat: {genHatMsg(weatherDescription, windSpeed)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Cloths: {genClothing(lowestTemp, windSpeed, rainIntensity)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Jackets: {genCoatMsg(rainIntensity)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Accessories: {genAccessories(weatherDescription, humidity)}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Shoes: {genShoesMsg(weatherDescription, lowestTemp)}
        </Typography>
      </Card>
    </Grid>
  );
};

export default Recommendations;
