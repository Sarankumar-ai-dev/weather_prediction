import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./components/WeatherDashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;