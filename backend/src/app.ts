import express from "express";
import config from "./config/Config";
import connectDB from "./config/MongoDatabase";
import appRouter from "./routes/Routes";
import { errorHandler } from "./middlewares/ErrorHandler";

//init app
const app = express();
app.use(express.json());

// connect DB
connectDB();

//routes
app.use("/api", appRouter);

//middlewares
app.use(errorHandler);

// define PORT

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Env: ${config.nodeEnv}`);
  console.log(`Server is running on port ${PORT}`);
});
