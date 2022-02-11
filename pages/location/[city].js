import Head from "next/head";
import React from "react";
import TodaysWeather from "../../comps/TodaysWeather";
import cites from "../../lib/city.list.json";
import moment from "moment-timezone";
import HourlyData from "../../comps/HourlyData";

export const getServerSideProps = async (context) => {
  const city = getCity(context.params.city);
  console.log(city);

  if (!city) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.API_KEY}&units=metric&exclude=minutely`
  );
  const data = await res.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  // console.log(data);
  const slug = context.params.city;
  console.log(data.timezone);
  return {
    props: {
      city: city,
      currentWeather: data?.current,
      dailyWeather: data?.daily,
      hourlyWeather: getHourlyWeather(data.hourly, data.timezone),
      data: data,
      timezone: data.timezone,
    },
  };
};

const getCity = (param) => {
  const cityParam = param.trim();
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }
  const city = cites.find((city) => city.id.toString() == id);
  if (city) {
    return city;
  } else {
    return null;
  }
};

// confused
const getHourlyWeather = (hourlyData, timezone) => {
  /*  const current = new Date();
  current.setHours(current.getHours(), 0, 0, 0, 0);
  const tomorrow = new Date(current);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  
  const currentTimeStamp = Math.floor(current.getTime() / 1000);
  const tomorrowTimeStamp = Math.floor(tomorrow.getTime() / 1000);
  
  */

  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodtimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = hourlyData.filter((data) => data.dt < eodtimeStamp);

  return todaysData;
};

const City = ({
  hourlyWeather,
  currentWeather,
  dailyWeather,
  city,
  data,
  timezone,
}) => {
  return (
    <div>
      <Head>
        <title>{city.name} next-weather app </title>
      </Head>
      <TodaysWeather
        weather={dailyWeather[0]}
        city={city}
        timezone={timezone}
      ></TodaysWeather>

      <HourlyData
        hourlyWeather={hourlyWeather}
        timezone={timezone}
      ></HourlyData>
    </div>
  );
};

export default City;
