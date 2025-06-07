require("dotenv").config();

const express = require("express");
const ratelimit = require("express-rate-limit");
const cors = require("cors");
const getWeatherData = require("./weatherService.js");

const app = express();
const PORT = process.env.PORT || 3000;

const limiter = ratelimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

app.use(cors());
app.use(limiter);

app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

app.get("/weather/:cityCode", async (req, res) => {
  const { cityCode } = req.params;

  try {
    const weatherData = await getWeatherData(decodeURIComponent(cityCode));
    res.json(weatherData);
  } catch (error) {
    console.error("🚀 ~ error:", error);
    res.status(500).json({ error: "Failed to fetch weather data." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
