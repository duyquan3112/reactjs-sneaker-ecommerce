import { ICacheService } from "../../../cache/interfaces/cache.interface";
import { IProduct } from "../interfaces/product.interface";
import {
  CACHE_KEYS,
  CACHE_TTL,
  generateCacheKey,
} from "../../../cache/redis/cache-keys.constant";
import { AppLogger } from "../../../utils/app-logger.util";

export interface IProductCacheService {
  getProductById(id: string): Promise<IProduct | null>;
  setProductById(id: string, product: IProduct): Promise<void>;
  getAllProducts(): Promise<IProduct[] | null>;
  setAllProducts(products: IProduct[]): Promise<void>;
  getProductsByName(name: string): Promise<IProduct[] | null>;
  setProductsByName(name: string, products: IProduct[]): Promise<void>;
  invalidateProductCache(productId?: string): Promise<void>;
}

export class ProductCacheService implements IProductCacheService {
  constructor(private cacheService: ICacheService) {}

  async getProductById(id: string): Promise<IProduct | null> {
    const key = generateCacheKey(CACHE_KEYS.PRODUCT.BY_ID, { id });
    return await this.cacheService.get<IProduct>(key);
  }

  async setProductById(id: string, product: IProduct): Promise<void> {
    const key = generateCacheKey(CACHE_KEYS.PRODUCT.BY_ID, { id });
    await this.cacheService.set(key, product, CACHE_TTL.PRODUCT.BY_ID);
  }

  async getAllProducts(): Promise<IProduct[] | null> {
    return await this.cacheService.get<IProduct[]>(CACHE_KEYS.PRODUCT.ALL);
  }

  async setAllProducts(products: IProduct[]): Promise<void> {
    await this.cacheService.set(
      CACHE_KEYS.PRODUCT.ALL,
      products,
      CACHE_TTL.PRODUCT.ALL
    );
  }

  async getProductsByName(name: string): Promise<IProduct[] | null> {
    const key = generateCacheKey(CACHE_KEYS.PRODUCT.BY_NAME, { name });
    return await this.cacheService.get<IProduct[]>(key);
  }

  async setProductsByName(name: string, products: IProduct[]): Promise<void> {
    const key = generateCacheKey(CACHE_KEYS.PRODUCT.BY_NAME, { name });
    await this.cacheService.set(key, products, CACHE_TTL.PRODUCT.BY_NAME);
  }

  async invalidateProductCache(productId?: string): Promise<void> {
    try {
      if (productId) {
        await this.cacheService.delete(
          generateCacheKey(CACHE_KEYS.PRODUCT.BY_ID, { id: productId })
        );
      }

      await this.cacheService.deletePattern(CACHE_KEYS.PRODUCT.PATTERN);

      AppLogger.info("Product cache invalidated successfully");
    } catch (error) {
      AppLogger.error("Error invalidating product cache:", error);
    }
  }
}
