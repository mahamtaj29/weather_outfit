import React from "react";
import { Box } from "@mui/material";

const BackgroundImage = ({ condition }) => {
  const getBackgroundImage = (condition) => {
    switch (condition) {
      case "Clear":
        return "/images/clear.jpg";
      case "Rain":
        return "/images/rain.jpg";
      case "Snow":
        return "/images/snow.jpg";
      default:
        return "/images/sky.jpg"; // Default sky image for unknown conditions
    }
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${getBackgroundImage(condition)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    />
  );
};

export default BackgroundImage;
