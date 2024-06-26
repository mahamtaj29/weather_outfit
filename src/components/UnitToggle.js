// src/components/UnitToggle.js
import React from "react";
import { ButtonGroup, Button, Box } from "@mui/material";

const UnitToggle = ({ unit, onUnitChange }) => {
  return (
    <Box sx={{ mb: 2, textAlign: "center" }}>
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          onClick={() => onUnitChange("metric")}
          variant={unit === "metric" ? "contained" : "outlined"}
        >
          °C
        </Button>
        <Button
          onClick={() => onUnitChange("imperial")}
          variant={unit === "imperial" ? "contained" : "outlined"}
        >
          °F
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default UnitToggle;
