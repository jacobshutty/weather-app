import axios from "axios";
import { groupBy } from "lodash";
const endpoint = "https://api.openweathermap.org/data/2.5/";
const key = "641cfac798324af08eca99e81102f477";
const units = "imperial";

function api(query) {
  return axios.get(`${endpoint}${query}&appid=${key}&units=${units}`);
}

function temperatureData(response) {
  const main = response.data.main;
  return {
    cityName: response.data.name,
    currentTemp: main.temp,
    minTemp: main.temp_min,
    maxTemp: main.temp_max,
  };
}

function forecastData(response) {
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
      conditions: item.weather[0].description,
    };
  });
  return {
    cityName: response.data.city.name,
    items: groupBy(items, "day"),
  };
}

export function getTemperatureByZip(zip) {
  // Get current temperature based on zip code
  return api(`weather?zip=${zip}`).then(response => {
    return temperatureData(response);
  });
}

export function getTemperatureByGeo(lat, long) {
  // Get current temperature based on geo location
  return api(`weather?lat=${lat}&lon=${long}`).then(response => {
    console.log(response);
    return temperatureData(response);
  });
}

export function getForecastByZip(zip) {
  // Get 5 day forecast based on zip code
  return api(`forecast?zip=${zip}`).then(response => {
    return forecastData(response);
  });
}

export function getForecastByGeo(lat, long) {
  // Get 5 day forecast based on geo location
  return api(`forecast?lat=${lat}&lon=${long}`).then(response => {
    return forecastData(response);
  });
}
