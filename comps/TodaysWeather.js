import React from "react";
import moment from "moment-timezone";

const TodaysWeather = ({ weather, city, timezone }) => {
  // console.log(weather);
  // console.log(city);
  return (
    <div
      style={{
        backgroundColor: "green",
        padding: "5px 15px",
        borderRadius: "10px",
        width: "50%",
        color: "white",
      }}
    >
      <h1>
        {city.name}({city.country})
      </h1>
      <img
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt=""
      />
      <h2>{weather.weather[0].description}</h2>

      <h2>
        <span>{weather.temp.max.toFixed(0)} &deg;C </span>
        <span>{weather.temp.min.toFixed(0)} &deg;C </span>
      </h2>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "20px" }}>
          <span> sunrise </span>
          <br />
          <span> {moment.unix(weather.sunrise).tz(timezone).format("LT")}</span>
        </div>
        <div>
          <span> sunset</span>
          <br />
          <span> {moment.unix(weather.sunset).tz(timezone).format("LT")}</span>
        </div>
      </div>
    </div>
  );
};

export default TodaysWeather;
