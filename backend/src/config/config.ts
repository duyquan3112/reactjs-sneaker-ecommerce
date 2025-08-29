import dotenv from "dotenv";

dotenv.config();

interface IConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  redisUri: string;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.CONNECTION_URI as string,
  redisUri: process.env.REDIS_URI as string,
};

export default config;
