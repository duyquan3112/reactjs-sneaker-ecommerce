import {
  ErrorCode,
  HttpStatusCode,
} from "../../../constants/http-status-code.constant";
import { Product } from "../interfaces/product.interface";
import { AppError } from "../../../utils/app-error.util";
import { IProductRepository } from "../interfaces/product-repository.interface";
import { ProductHelper } from "../helpers/product.helper";
import { CreateProductDTO } from "../dtos/request/create-product.dto";
import { UpdateProductDTO } from "../dtos/request/update-product.dto";
import { AppLogger } from "../../../utils/app-logger.util";
import { DEFAULT_PRODUCT_LIMIT } from "../../../constants/app.constant";
import { IProductCacheService } from "../cache/product-cache.service";

class ProductService {
  private readonly productRepository: IProductRepository;
  private readonly productCacheService: IProductCacheService;

  constructor(
    productRepository: IProductRepository,
    productCacheService: IProductCacheService
  ) {
    this.productRepository = productRepository;
    this.productCacheService = productCacheService;
  }

  async getProducts(limit: number = DEFAULT_PRODUCT_LIMIT) {
    const allProducts = await this.getAllProducts();
    return allProducts.slice(0, limit);
  }

  async getAllProducts() {
    try {
      const cachedProducts = await this.productCacheService.getAllProducts();

      if (cachedProducts && cachedProducts.length > 0) {
        return cachedProducts;
      }

      const products = await this.productRepository.findAll();

      if (products && products.length > 0) {
        await this.productCacheService.setAllProducts(products);
      }

      return products;
    } catch (error) {
      AppLogger.error("Error getting all products:", error);
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to retrieve products"
      );
    }
  }

  async getProductById(id: string) {
    ProductHelper.validateId(id);

    try {
      const cachedProduct = await this.productCacheService.getProductById(id);

      if (cachedProduct) {
        return cachedProduct;
      }

      const product = await this.productRepository.findById(id);

      if (!product) {
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ErrorCode.NOT_FOUND,
          "Product not found!"
        );
      }

      await this.productCacheService.setProductById(id, product);
      return product;
    } catch (error) {
      AppLogger.error("Error getting product by ID:", error);
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to retrieve product"
      );
    }
  }

  async getProductsByName(name: string) {
    if (!name || name.trim() === "") {
      return await this.getAllProducts();
    }

    try {
      const trimmedName = name.trim();
      const cachedProducts =
        await this.productCacheService.getProductsByName(trimmedName);

      if (cachedProducts && cachedProducts.length > 0) {
        return cachedProducts;
      }

      const products = await this.productRepository.findByName(trimmedName);

      if (products && products.length > 0) {
        await this.productCacheService.setProductsByName(trimmedName, products);
      }

      return products;
    } catch (error) {
      AppLogger.error("Error searching products by name:", error);
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to search products"
      );
    }
  }

  async createProduct(data: CreateProductDTO) {
    AppLogger.info("Creating product:", data);

    try {
      const product = ProductHelper.buildProductFromDTO(data);
      const createdProduct = await this.productRepository.create(product);

      await this.invalidateRelevantCaches();

      return createdProduct;
    } catch (error) {
      AppLogger.error("Error creating product:", error);
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to create product"
      );
    }
  }

  async updateProduct(id: string, data: UpdateProductDTO) {
    ProductHelper.validateId(id);

    try {
      const currentProductData = await this.getProductById(id);
      const currentProduct = new Product(currentProductData);
      const updatedProductData = ProductHelper.buildUpdatedProductData(
        currentProduct,
        data
      );

      const updatedProduct = await this.productRepository.update(
        id,
        updatedProductData
      );

      if (!updatedProduct) {
        throw new AppError(
          HttpStatusCode.NOT_FOUND,
          ErrorCode.NOT_FOUND,
          "Product not found!"
        );
      }

      await this.productCacheService.invalidateProductCache(id);

      return updatedProduct;
    } catch (error) {
      AppLogger.error("Error updating product:", error);
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to update product"
      );
    }
  }

  async deleteProduct(id: string) {
    ProductHelper.validateId(id);

    try {
      const deleteResult = await this.productRepository.delete(id);

      if (deleteResult) {
        await this.productCacheService.invalidateProductCache(id);
      }

      return deleteResult;
    } catch (error) {
      AppLogger.error("Error deleting product:", error);
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to delete product"
      );
    }
  }

  private async invalidateRelevantCaches(): Promise<void> {
    try {
      await this.productCacheService.invalidateProductCache();
    } catch (error) {
      AppLogger.error("Error invalidating cache:", error);
    }
  }
}

export default ProductService;
