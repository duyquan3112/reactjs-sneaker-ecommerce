import dotenv from "dotenv";
import path from "path";

const envFile = path.resolve(
  process.cwd(),
  `.env.${process.env.NODE_ENV || "development"}`
);

dotenv.config({
  path: envFile
});

interface IConfig {
  port: number;
  nodeEnv: string;
  mongoUri: string;
  redisUri: string;
  pgDbHost: string;
  pgDbPort: number;
  pgDbUser: string;
  pgDbPassword: string;
  pgDbName: string;
}

const config: IConfig = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MG_CONNECTION_URI as string,
  redisUri: process.env.REDIS_URI as string,
  pgDbHost: process.env.PG_DB_HOST as string,
  pgDbPort: Number(process.env.PG_DB_PORT),
  pgDbUser: process.env.PG_DB_USERNAME as string,
  pgDbPassword: process.env.PG_DB_PASSWORD as string,
  pgDbName: process.env.PG_DB_NAME as string
};

export default config;
