import { redisClient } from "./redis.client";
import { ICacheService } from "../interfaces/cache.interface";
import { AppLogger } from "../../utils/app-logger.util";

export class RedisCacheService implements ICacheService {
  async get<T>(key: string): Promise<T | null> {
    try {
      const value = await redisClient.get(key);
      if (!value) return null;

      return JSON.parse(value) as T;
    } catch (error) {
      AppLogger.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  async set<T>(key: string, value: T, ttl: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      // If ttl is provided and > 0, set expiration. Otherwise set key without TTL (persistent)
      if (ttl && ttl > 0) {
        await redisClient.set(key, serializedValue, {
          expiration: {
            type: "EX",
            value: ttl
          }
        });
      } else {
        await redisClient.set(key, serializedValue);
      }
    } catch (error) {
      AppLogger.error(`Cache set error for key ${key}:`, error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      await redisClient.del(key);
    } catch (error) {
      AppLogger.error(`Cache delete error for key ${key}:`, error);
    }
  }

  async deletePattern(pattern: string): Promise<void> {
    try {
      const keys = await redisClient.keys(pattern);
      if (keys.length > 0) {
        await redisClient.del(keys);
      }
    } catch (error) {
      AppLogger.error(`Cache delete pattern error for ${pattern}:`, error);
    }
  }

  async exists(key: string): Promise<boolean> {
    try {
      return (await redisClient.exists(key)) === 1;
    } catch (error) {
      AppLogger.error(`Cache exists error for key ${key}:`, error);
      return false;
    }
  }
}
