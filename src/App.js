import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import theme from "../src/components/theme";
import Navbar from "./components/Navbar";
import sky from "./images/sky.jpg";

function App() {
  return (
    <Box
      class="sky"
      style={{
        backgroundImage: `url(${sky})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        //alignItems: "center",
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">
          <Navbar />
          <WeatherCard />
        </div>
      </ThemeProvider>
    </Box>
  );
}

export default App;
