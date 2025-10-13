import "reflect-metadata";
import express from "express";
import config from "./config/config";
import connectMongoDB from "./config/mongo-database";
import appRouter from "./routes/app.routes";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { initializeRedis } from "./cache/redis/redis.client";
import { AppLogger } from "./utils/app-logger.util";
import cors from "cors";
import connectPostgresDB from "./config/postgres-database";

//init app
const app = express();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);
app.use(express.json());

//routes
app.use("/api", appRouter);

//middlewares
app.use(errorHandler);

const initApp = async () => {
  try {
    await connectMongoDB();
    await connectPostgresDB();
    await initializeRedis();
  } catch (error) {
    AppLogger.error("App initialization error:", error);
    process.exit(1);
  }

  const PORT = config.port;
  app.listen(PORT, () => {
    AppLogger.info(`Env: ${config.nodeEnv}`);
    AppLogger.info(`Server is running on port ${PORT}`);
  });
};

initApp();
