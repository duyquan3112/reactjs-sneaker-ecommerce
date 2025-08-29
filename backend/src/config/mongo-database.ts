import mongoose from "mongoose";
import config from "./config";
import { AppLogger } from "../utils/app-logger.util";

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

const connectDB = async (): Promise<void> => {
  const connectionString = config.mongoUri;

  try {
    await mongoose.connect(connectionString);
    AppLogger.info("MongoDB connected");
  } catch (e) {
    AppLogger.error("MongoDB connection error:", e);
    process.exit(1);
  }
};

export default connectDB;
