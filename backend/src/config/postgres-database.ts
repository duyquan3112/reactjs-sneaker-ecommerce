import { DataSource } from "typeorm";
import config from "./config";
import { AppLogger } from "../utils/app-logger.util";

export const PostgresDatasource = new DataSource({
  type: "postgres",
  host: config.pgDbHost,
  port: config.pgDbPort,
  username: config.pgDbUser,
  password: config.pgDbPassword,
  database: config.pgDbName,
  synchronize: false,
  logging: ["query", "error", "migration"],
  entities: [__dirname + "/../modules/**/*.entity.{ts,js}"],
  migrations: [__dirname + "/../migrations/*.{ts,js}"]
});

const connectPostgresDB = async () => {
  await PostgresDatasource.initialize()
    .then(() => {
      AppLogger.info("PostgreSQL connected");
    })
    .catch((error) => {
      AppLogger.error("PostgreSQL connection error:", error);
      process.exit(1);
    });
};

export default connectPostgresDB;
