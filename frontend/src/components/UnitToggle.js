import React from "react";
import { ButtonGroup, Button, Box } from "@mui/material";
// Props: unit (current unit of measurement), onUnitChange (function to change the unit)
const UnitToggle = ({ unit, onUnitChange }) => {
  return (
    <Box sx={{ mb: 2, textAlign: "center" }}>
      {/* ButtonGroup component to group the unit toggle buttons together */}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {/* Button for metric units (°C) */}
        <Button
          // Call onUnitChange with "metric" when clicked
          onClick={() => onUnitChange("metric")}
          // Highlight if current unit is metric
          variant={unit === "metric" ? "contained" : "outlined"}
        >
          °C
        </Button>
        {/* Button for imperial units (°F) */}
        <Button
          // Call onUnitChange with "imperial" when clicked
          onClick={() => onUnitChange("imperial")}
          // Highlight if current unit is imperial
          variant={unit === "imperial" ? "contained" : "outlined"}
        >
          °F
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default UnitToggle;
