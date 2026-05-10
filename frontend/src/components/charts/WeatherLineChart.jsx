import React, { useState } from "react";
import "./charts.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const WeatherLineChart = ({ data }) => {
  if (!data || !data.hourly_forecast) return null;
  const hourly = data.hourly_forecast;
  const grouped = hourly.reduce((acc, item) => {
    const day = item.time.split("T")[0];
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  const dates = Object.keys(grouped);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const lineData = dates.map((date) => {
    const avgTemp =
      grouped[date].reduce((sum, item) => sum + item.temperature, 0) /
      grouped[date].length;

    return {
      date,
      avgTemp: Number(avgTemp.toFixed(1)),
    };
  });

  const getWeatherClass = (hour) => {
    if (hour.rain > 0) return "rainy";
    if (hour.wind > 15) return "windy";
    return "sunny";
  };

  const getWeatherIcon = (hour) => {
    if (hour.rain > 0) return "🌧";
    if (hour.wind > 15) return "🌬";
    return "☀";
  };

  return (
    <div className="chart-container">
      <h2>7 Day Weather</h2>
      <div className="chart-scroll">
        <div className="chart-inner">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="avgTemp"
                stroke="#ff7300"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="date-buttons">
        {dates.map((date) => (
          <button
            key={date}
            className={`date-btn ${selectedDate === date ? "active" : ""}`}
            onClick={() => setSelectedDate(date)}
          >
            {date}
          </button>
        ))}
      </div>
      <div className="timeline">
        {grouped[selectedDate]?.map((h, i) => (
          <div className={`hour-box ${getWeatherClass(h)}`} key={i}>
            <p>{new Date(h.time).getHours()}:00</p>
            <div className="weather-icon">{getWeatherIcon(h)}</div>
            <p>{h.temperature}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherLineChart;