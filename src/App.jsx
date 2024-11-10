// src/App.jsx
import React from "react";
import CarList from "./components/CarList";
import { AppBar, Typography } from "@mui/material";

function App() {
  return (
    <>
      <AppBar position="static" style={{ width: "100%" }}>
        <Typography variant="h6" sx={{ padding: 2 }}>
          Car Shop
        </Typography>
      </AppBar>
      <div style={{ padding: "20px" }}>
        <CarList />
      </div>
    </>
  );
}

export default App;
