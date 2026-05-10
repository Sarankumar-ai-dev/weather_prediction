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

const HumidityChart = ({ data }) => {
  if (!data || !data.hourly_forecast) return null;

  const hourly = data.hourly_forecast;
  const groupedData = [
    {
      range: "1-3",
      humidity:
        (hourly[1]?.humidity +
          hourly[2]?.humidity +
          hourly[3]?.humidity) / 3 || 0,
    },
    {
      range: "4-7",
      humidity:
        (hourly[4]?.humidity +
          hourly[5]?.humidity +
          hourly[6]?.humidity +
          hourly[7]?.humidity) / 4 || 0,
    },
    {
      range: "8-12",
      humidity:
        (hourly[8]?.humidity +
          hourly[9]?.humidity +
          hourly[10]?.humidity +
          hourly[11]?.humidity +
          hourly[12]?.humidity) / 5 || 0,
    },
    {
      range: "13-18",
      humidity:
        (hourly[13]?.humidity +
          hourly[14]?.humidity +
          hourly[15]?.humidity +
          hourly[16]?.humidity +
          hourly[17]?.humidity +
          hourly[18]?.humidity) / 6 || 0,
    },
    {
      range: "19-24",
      humidity:
        (hourly[19]?.humidity +
          hourly[20]?.humidity +
          hourly[21]?.humidity +
          hourly[22]?.humidity +
          hourly[23]?.humidity) / 5 || 0,
    },
  ];

  const avgHumidity = data.summary.avg_humidity;

  return (
    <div className="chart-container">
      <div className="temp-top">
        <div className="temp-text">
          <h2>Today's Humidity</h2>
          <h1>{avgHumidity}%</h1>
          <p>Average humidity today</p>
        </div>

        <div className="temp-circle">
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[{ value: avgHumidity }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill="#7E57C2"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="center-text humidity-text">{avgHumidity}%</div>
        </div>
      </div>
      <div className="bar-section">
        <h3>Humidity by Time Range</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={groupedData} barSize={30} barGap={8}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="humidity"
              fill="#B39DDB"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HumidityChart;