require("dotenv").config();

const { createClient } = require("redis");

const redisClient = createClient({
  username: process.env.REDIS_USERNAME || "default",
  password: process.env.REDIS_PASSWORD || "",
  socket: {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

(async () => {
  await redisClient.connect();
})();

module.exports = {
  get: (key) => redisClient.get(key),
  set: (key, value, ttlSeconds) =>
    redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds }),
};
