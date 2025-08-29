import { BasicClientSideCache, createClient } from "redis";
import config from "../../config/config";
import { AppLogger } from "../../utils/app-logger.util";

const cache = new BasicClientSideCache({
  ttl: 0,
  maxEntries: 0,
  evictPolicy: "LRU",
});

export const redisClient = createClient({
  url: config.redisUri,
  RESP: 3,
  clientSideCache: cache,
});

export const initializeRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    AppLogger.error("Redis connection error:", error);
    process.exit(1);
  }
};

// Event listeners for debugging & monitoring
redisClient.on("connect", () => AppLogger.info("[Redis] Connecting..."));
redisClient.on("ready", () => AppLogger.info("[Redis] Connected and ready!"));
redisClient.on("error", (err) => AppLogger.error("[Redis] Error", err));
redisClient.on("end", () => AppLogger.warn("[Redis] Connection closed"));
