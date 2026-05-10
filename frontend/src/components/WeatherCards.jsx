import React, { useState } from "react";
import "./weatherCards.css";

import WeatherLineChart from "./charts/WeatherLineChart";
import TemperatureChart from "./charts/TemperatureChart";
import RainChart from "./charts/RainChart";
import WindChart from "./charts/WindChart";
import HumidityChart from "./charts/HumidityChart";

const WeatherCards = ({ weatherData }) => {
  const [selectedCard, setSelectedCard] = useState("weather");
  if (!weatherData) {
    return (
      <div className="empty-screen">
        <h2>Search your location</h2>
        <p>Enter a city name above to view the weather forecast</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Top tabs */}
      <div className="cards">
        <div
          className={`card ${selectedCard === "weather" ? "active" : ""}`}
          onClick={() => setSelectedCard("weather")}
        >
          Weather
        </div>

        <div
          className={`card ${selectedCard === "temperature" ? "active" : ""}`}
          onClick={() => setSelectedCard("temperature")}
        >
          Temperature
        </div>

        <div
          className={`card ${selectedCard === "rain" ? "active" : ""}`}
          onClick={() => setSelectedCard("rain")}
        >
          Rain
        </div>

        <div
          className={`card ${selectedCard === "wind" ? "active" : ""}`}
          onClick={() => setSelectedCard("wind")}
        >
          Wind
        </div>

        <div
          className={`card ${selectedCard === "humidity" ? "active" : ""}`}
          onClick={() => setSelectedCard("humidity")}
        >
          Humidity
        </div>
      </div>
      <div className="chart-box">
        {selectedCard === "weather" && <WeatherLineChart data={weatherData} />}
        {selectedCard === "temperature" && <TemperatureChart data={weatherData} />}
        {selectedCard === "rain" && <RainChart data={weatherData} />}
        {selectedCard === "wind" && <WindChart data={weatherData} />}
        {selectedCard === "humidity" && <HumidityChart data={weatherData} />}
      </div>
    </div>
  );
};

export default WeatherCards;