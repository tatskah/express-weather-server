require("dotenv").config();

const PORT = process.env.PORT || 8080;
const WEATHERAPI_URL = "https://api.open-meteo.com/v1/forecast&hourly=temperature_2m,rain,weather_code&daily=weather_code";

const HTTP_OPTIONS = {
  hostname: WEATHERAPI_URL,
  port: 80,
  path: "/",
  method: "GET",
};

module.exports = {
  PORT,
  WEATHERAPI_URL,
  HTTP_OPTIONS,
};
