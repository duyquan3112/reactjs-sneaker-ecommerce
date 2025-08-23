import config from "../config/config";

type LogLevel = "info" | "warn" | "error" | "debug";

function log(level: LogLevel, message: string, ...args: unknown[]) {
  if (config.nodeEnv === "development") {
    const timestamp = new Date().toISOString();
    switch (level) {
      case "info":
        console.log(`[INFO] ${timestamp} - ${message}`, ...args);
        break;
      case "warn":
        console.warn(`[WARN] ${timestamp} - ${message}`, ...args);
        break;
      case "error":
        console.error(`[ERROR] ${timestamp} - ${message}`, ...args);
        break;
      case "debug":
        console.debug(`[DEBUG] ${timestamp} - ${message}`, ...args);
        break;
    }
  }
}

export const AppLogger = {
  info: (msg: string, ...args: unknown[]) => log("info", msg, ...args),
  warn: (msg: string, ...args: unknown[]) => log("warn", msg, ...args),
  error: (msg: string, ...args: unknown[]) => log("error", msg, ...args),
  debug: (msg: string, ...args: unknown[]) => log("debug", msg, ...args)
};
