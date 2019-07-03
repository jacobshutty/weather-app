import axios from "axios";
import { groupBy } from "lodash";
const endpoint = "https://api.openweathermap.org/data/2.5/";
const key = "641cfac798324af08eca99e81102f477";
const units = "imperial";

function api(query) {
  return axios.get(`${endpoint}${query}&appid=${key}&units=${units}`);
}

export function getLocation() {
  return navigator.geolocation.getCurrentPosition(function(location) {
    return location;
  });
}

export function getTemperature(zip) {
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
  return api(`forecast?zip=${zip}`).then(response => {
    console.log(response);
    const items = response.data.list.map(item => {
      const date = new Date(item.dt * 1000);
      return {
        temp: item.main.temp,
        id: item.dt,
        day: date.getDate()
      };
    });
    console.log(groupBy(items, "day"));
    return groupBy(items, "day");
  });
}
