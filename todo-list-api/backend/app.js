import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/error.middleware.js";
import { limiter } from "./middleware/rateLimiter.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "./config/swagger-output.json" assert { type: "json" };

dotenv.config();
connectDB();

const app = express();
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(limiter);
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  "/api",
  authRoutes
  /*
    #swagger.tags = ['Auth']
    #swagger.security = [{ "bearerAuth": [] }]
  */
);
app.use(
  "/api/todos",
  todoRoutes
  /*
    #swagger.tags = ['Todo']
    #swagger.security = [{ "bearerAuth": [] }]
  */
);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} at http://localhost:${PORT}`);
});

export default app;
