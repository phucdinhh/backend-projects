import rateLimit from "express-rate-limit";
import dotenv from "dotenv";

dotenv.config();

export const limiter = rateLimit({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW) * 60 * 1000, // 15 minutes
  max: Number(process.env.RATE_LIMIT_MAX), // limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
