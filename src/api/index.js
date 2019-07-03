import axios from "axios";
import { groupBy } from "lodash";
const endpoint = "https://api.openweathermap.org/data/2.5/";
const key = "641cfac798324af08eca99e81102f477";
const units = "imperial";

function api(query) {
  return axios.get(`${endpoint}${query}&appid=${key}&units=${units}`);
}

export function getTemperature(zip) {
  // Get current temperature based on zip code
  return api(`weather?zip=${zip}`).then(response => {
    const main = response.data.main;
    return {
      currentTemp: main.temp,
      minTemp: main.temp_min,
      maxTemp: main.temp_max
    };
  });
}

export function getForecast(zip) {
  // Get 5 day forecast based on zip code
  return api(`forecast?zip=${zip}`).then(response => {
    console.log(response);
    const items = response.data.list.map(item => {
      const date = new Date(item.dt * 1000);
      return {
        temp: item.main.temp,
        id: item.dt, // unix timestamp
        day: `${date.getMonth()} / ${date.getDate()}`,
        time: `${((date.getHours() + 11) % 12) + 1}:00 ${
          date.getHours() >= 12 ? "PM" : "AM"
        }`,
        icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        conditions: item.weather[0].description
      };
    });
    return groupBy(items, "day");
  });
}
