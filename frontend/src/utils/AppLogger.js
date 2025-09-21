const AppLogger = {
  info: (message, ...args) => {
    log("info", message, ...args);
  },
  warn: (message, ...args) => {
    log("warn", message, ...args);
  },
  error: (message, ...args) => {
    log("error", message, ...args);
  },
  debug: (message, ...args) => {
    log("debug", message, ...args);
  },
};

const log = (level, message, ...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(`[${level}] ${message}`, ...args);
  }
};

export default AppLogger;
