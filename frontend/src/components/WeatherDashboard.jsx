import React, { useState } from "react";
import Navbar from "./Navbar";
import WeatherCards from "./WeatherCards";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async (place) => {
    try {
      const res = await fetch(` https://weather-prediction-bdgh.onrender.com/weather/?place=${place}`);
      const data = await res.json();
      setWeatherData(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  return (
    <div>
      <Navbar onSearch={fetchWeather} />
      <WeatherCards weatherData={weatherData} />
    </div>
  );
};

export default WeatherDashboard;