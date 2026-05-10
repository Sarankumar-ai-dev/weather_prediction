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

const WindChart = ({ data }) => {
  if (!data || !data.hourly_forecast) return null;

  const hourly = data.hourly_forecast;

  // Group wind data
  const groupedData = [
    {
      range: "1-3",
      wind:
        (hourly[1]?.wind +
          hourly[2]?.wind +
          hourly[3]?.wind) / 3 || 0,
    },
    {
      range: "4-7",
      wind:
        (hourly[4]?.wind +
          hourly[5]?.wind +
          hourly[6]?.wind +
          hourly[7]?.wind) / 4 || 0,
    },
    {
      range: "8-12",
      wind:
        (hourly[8]?.wind +
          hourly[9]?.wind +
          hourly[10]?.wind +
          hourly[11]?.wind +
          hourly[12]?.wind) / 5 || 0,
    },
    {
      range: "13-18",
      wind:
        (hourly[13]?.wind +
          hourly[14]?.wind +
          hourly[15]?.wind +
          hourly[16]?.wind +
          hourly[17]?.wind +
          hourly[18]?.wind) / 6 || 0,
    },
    {
      range: "19-24",
      wind:
        (hourly[19]?.wind +
          hourly[20]?.wind +
          hourly[21]?.wind +
          hourly[22]?.wind +
          hourly[23]?.wind) / 5 || 0,
    },
  ];

  const maxWind = data.summary.max_wind;

  return (
    <div className="chart-container">
      {/* Top section */}
      <div className="temp-top">
        <div className="temp-text">
          <h2>Today's Wind Speed</h2>
          <h1>{maxWind} km/h</h1>
          <p>Maximum wind speed today</p>
        </div>

        <div className="temp-circle">
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              innerRadius="70%"
              outerRadius="100%"
              data={[{ value: maxWind }]}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar
                dataKey="value"
                cornerRadius={10}
                fill="#00C853"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="center-text wind-text">{maxWind} km/h</div>
        </div>
      </div>
      <div className="bar-section">
        <h3>Wind Speed by Time Range</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={groupedData} barSize={30} barGap={8}>
            <XAxis dataKey="range" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="wind"
              fill="#69F0AE"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WindChart;