import React from "react";
import "./charts.css";
import {
  RadialBarChart,
  RadialBar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RainChart = ({ data }) => {
  if (!data || !data.hourly_forecast) return null;

  const hourly = data.hourly_forecast;

  // Group hours
  const groupedData = [
    {
      range: "1-3",
      rain:
        (hourly[1]?.rain +
          hourly[2]?.rain +
          hourly[3]?.rain) / 3 || 0,
    },
    {
      range: "4-7",
      rain:
        (hourly[4]?.rain +
          hourly[5]?.rain +
          hourly[6]?.rain +
          hourly[7]?.rain) / 4 || 0,
    },
    {
      range: "8-12",
      rain:
        (hourly[8]?.rain +
          hourly[9]?.rain +
          hourly[10]?.rain +
          hourly[11]?.rain +
          hourly[12]?.rain) / 5 || 0,
    },
    {
      range: "13-18",
      rain:
        (hourly[13]?.rain +
          hourly[14]?.rain +
          hourly[15]?.rain +
          hourly[16]?.rain +
          hourly[17]?.rain +
          hourly[18]?.rain) / 6 || 0,
    },
    {
      range: "19-24",
      rain:
        (hourly[19]?.rain +
          hourly[20]?.rain +
          hourly[21]?.rain +
          hourly[22]?.rain +
          hourly[23]?.rain) / 5 || 0,
    },
  ];

  const totalRain = data.summary.total_rain;

  return (
    <div className="chart-container">
      <div className="temp-top">
        <div className="temp-text">
          <h2>Today's Rainfall</h2>
          <h1>{totalRain} mm</h1>
          <p>Total rain expected today</p>
        </div>

        <div className="temp-circle">
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[{ value: totalRain }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill="#2196F3"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="center-text rain-text">{totalRain} mm</div>
        </div>
      </div>
      <div className="bar-section">
        <h3>Rain by Time Range</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={groupedData} barSize={30} barGap={8}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="rain"
              fill="#4FC3F7"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RainChart;