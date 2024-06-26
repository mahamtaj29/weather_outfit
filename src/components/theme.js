import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff",
    },
    secondary: {
      main: "#ff4081",
    },
    text: {
      primary: "#ffffff", // White text for better contrast on dark background
      secondary: "#000000", // Black text for light backgrounds
    },
  },
  typography: {
    fontFamily: "Georgia, serif",
    h2: {
      color: "#ffffff", // White text for h2 headers
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adding shadow for better readability
    },
    h6: {
      color: "#ffffff", // White text for h6 headers
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Adding shadow for better readability
    },
    button: {
      color: "#ffffff",
    },
  },
});

export default theme;
