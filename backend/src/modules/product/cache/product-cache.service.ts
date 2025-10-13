import { ICacheService } from "../../../cache/interfaces/cache.interface";
import { IProduct } from "../interfaces/product.interface";
import {
  PRODUCT_CACHE_KEYS,
  PRODUCT_CACHE_TTL
} from "../cache/product-cache-keys.constant";
import { AppLogger } from "../../../utils/app-logger.util";
import { generateCacheKeyWithParams } from "../../../utils/redis.util";

export interface IProductCacheService {
  getProductById(id: string): Promise<IProduct | null>;
  setProductById(id: string, product: IProduct): Promise<void>;
  getAllProducts(): Promise<IProduct[] | null>;
  setAllProducts(products: IProduct[]): Promise<void>;
  getProductsByName(name: string): Promise<IProduct[] | null>;
  setProductsByName(name: string, products: IProduct[]): Promise<void>;
  invalidateProductCache(productId?: string): Promise<void>;
  getHomeProducts(limit: number): Promise<IProduct[] | null>;
  setHomeProducts(products: IProduct[], limit: number): Promise<void>;
}

export class ProductCacheService implements IProductCacheService {
  constructor(private cacheService: ICacheService) {}

  async getProductById(id: string): Promise<IProduct | null> {
    const key = generateCacheKeyWithParams(PRODUCT_CACHE_KEYS.BY_ID, { id });
    return await this.cacheService.get<IProduct>(key);
  }

  async setProductById(id: string, product: IProduct): Promise<void> {
    const key = generateCacheKeyWithParams(PRODUCT_CACHE_KEYS.BY_ID, { id });
    await this.cacheService.set(key, product, PRODUCT_CACHE_TTL.BY_ID);
  }

  async getAllProducts(): Promise<IProduct[] | null> {
    return await this.cacheService.get<IProduct[]>(PRODUCT_CACHE_KEYS.ALL);
  }

  async setAllProducts(products: IProduct[]): Promise<void> {
    await this.cacheService.set(
      PRODUCT_CACHE_KEYS.ALL,
      products,
      PRODUCT_CACHE_TTL.ALL
    );
  }

  async getProductsByName(name: string): Promise<IProduct[] | null> {
    const key = generateCacheKeyWithParams(PRODUCT_CACHE_KEYS.BY_NAME, {
      name
    });
    return await this.cacheService.get<IProduct[]>(key);
  }

  async setProductsByName(name: string, products: IProduct[]): Promise<void> {
    const key = generateCacheKeyWithParams(PRODUCT_CACHE_KEYS.BY_NAME, {
      name
    });
    await this.cacheService.set(key, products, PRODUCT_CACHE_TTL.BY_NAME);
  }

  async getHomeProducts(limit: number): Promise<IProduct[] | null> {
    const key = generateCacheKeyWithParams(PRODUCT_CACHE_KEYS.HOME, { limit });
    return await this.cacheService.get<IProduct[]>(key);
  }

  async setHomeProducts(products: IProduct[], limit: number): Promise<void> {
    const key = generateCacheKeyWithParams(PRODUCT_CACHE_KEYS.HOME, { limit });
    await this.cacheService.set(key, products, PRODUCT_CACHE_TTL.HOME);
  }

  async invalidateProductCache(productId?: string): Promise<void> {
    try {
      if (productId) {
        await this.cacheService.delete(
          generateCacheKeyWithParams(PRODUCT_CACHE_KEYS.BY_ID, {
            id: productId
          })
        );
      }

      await this.cacheService.deletePattern(PRODUCT_CACHE_KEYS.PATTERN);

      AppLogger.info("Product cache invalidated successfully");
    } catch (error) {
      AppLogger.error("Error invalidating product cache:", error);
    }
  }
}
