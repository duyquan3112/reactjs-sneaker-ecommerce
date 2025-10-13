import { MongoProductRepository } from "../repositories/product.repository";
import { ProductCacheService } from "../cache/product-cache.service";
import { ProductService } from "../services/product.service";
import { ProductController } from "../controllers/product.controller";
import { RedisCacheService } from "../../../cache/redis/redis-cache.service";
import { IProductService } from "../interfaces/product-service.interface";

const productRepository = new MongoProductRepository();

const productCacheService = new ProductCacheService(new RedisCacheService());

const productService: IProductService = new ProductService(
  productRepository,
  productCacheService
);

export const productController = new ProductController(productService);
