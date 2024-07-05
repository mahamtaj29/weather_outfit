import React from "react";
import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    // Box component to center content vertically and horizontally
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {/* CircularProgress component from Material-UI */}
      <CircularProgress />
    </Box>
  );
};

export default Loading;
