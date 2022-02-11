import moment from "moment";
import Image from "next/image";
import React from "react";

const HourlyData = ({ hourlyWeather, timezone }) => {
  console.log(hourlyWeather);
  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      {hourlyWeather.map((hour, index) => {
        return (
          <div key={index}>
            <div
              style={{
                marginLeft: "20px",
                background: "pink",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              <span style={{ display: "block", textAlign: "center" }}>
                {index == 0
                  ? "now"
                  : moment.unix(hour.dt).tz(timezone).format("LT")}
              </span>
              <Image
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
                alt={hour.weather[0].description}
                width="60"
                height="60"
                style={{ margin: "0 auto" }}
              />
              <h5 style={{ textAlign: "center" }}>
                {hour.temp.toFixed(0)}&deg;C
              </h5>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HourlyData;
