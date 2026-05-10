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

const TemperatureChart = ({ data }) => {
  if (!data || !data.hourly_forecast) return null;

  const hourly = data.hourly_forecast;
  const groupedData = [
    {
      range: "1-3",
      temperature:
        (hourly[1]?.temperature +
          hourly[2]?.temperature +
          hourly[3]?.temperature) /
        3,
    },
    {
      range: "4-7",
      temperature:
        (hourly[4]?.temperature +
          hourly[5]?.temperature +
          hourly[6]?.temperature +
          hourly[7]?.temperature) /
        4,
    },
    {
      range: "8-12",
      temperature:
        (hourly[8]?.temperature +
          hourly[9]?.temperature +
          hourly[10]?.temperature +
          hourly[11]?.temperature +
          hourly[12]?.temperature) /
        5,
    },
    {
      range: "13-18",
      temperature:
        (hourly[13]?.temperature +
          hourly[14]?.temperature +
          hourly[15]?.temperature +
          hourly[16]?.temperature +
          hourly[17]?.temperature +
          hourly[18]?.temperature) /
        6,
    },
    {
      range: "19-24",
      temperature:
        (hourly[19]?.temperature +
          hourly[20]?.temperature +
          hourly[21]?.temperature +
          hourly[22]?.temperature +
          hourly[23]?.temperature) /
        5,
    },
  ];

  const avgTemp = data.summary.avg_temp;

  return (
    <div className="chart-container">
      <div className="temp-top">
        <div className="temp-text">
          <h2>Today Temperature</h2>
          <h1>{avgTemp}°C</h1>
          <p>Average temperature today</p>
        </div>

        <div className="temp-circle">
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[{ value: avgTemp }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill="#7B61FF"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="center-text">{avgTemp}°C</div>
        </div>
      </div>

      <div className="bar-section">
        <h3>Temperature by Time Range</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={groupedData} barSize={30} barGap={5}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="temperature"
              fill="#00B8A9"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureChart;