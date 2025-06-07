require("dotenv").config();

const axios = require("axios");
const cache = require("./cache.js");

const WEATHER_API_KEY = process.env.VISUAL_CROSSING_API_KEY;
const BASE_WEATHER_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

async function fetchWeatherFromAPI(cityCode) {
  const url = `${BASE_WEATHER_URL}${cityCode}?unitGroup=metric&key=${WEATHER_API_KEY}&contentType=json`;
  const response = await axios.get(url);
  return response.data;
}

async function getWeatherData(cityCode) {
  const cachedData = await cache.get(cityCode);

  if (cachedData) {
    try {
      const parsedData = JSON.parse(cachedData);
      return { ...parsedData, source: "cache" };
    } catch (error) {
      console.error("Failed to parse cached data:", error);
      throw new Error("Invalid cached data format.");
    }
  }

  const weatherData = await fetchWeatherFromAPI(cityCode);
  if (!weatherData || !weatherData.currentConditions) {
    throw new Error("Invalid weather data received from API.");
  }

  await cache.set(cityCode, weatherData, 3600); // Cache for 1 hour
  return { ...weatherData, source: "api" };
}

module.exports = getWeatherData;
