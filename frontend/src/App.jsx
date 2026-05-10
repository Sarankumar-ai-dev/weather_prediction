import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import WeatherDashboard from "./components/WeatherDashboard";
import Ask from "./components/Ask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
        <Route path="/ask" element={<Ask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;