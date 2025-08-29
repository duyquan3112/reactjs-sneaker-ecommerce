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
import { ProductVariant } from "../interfaces/product-variant.interface";
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
    const cachedProducts = await this.productCacheService.getAllProducts();

    // Get products from cache
    if (cachedProducts) {
      return cachedProducts.slice(0, limit);
    }

    // Get products from database
    const products = await this.productRepository.findWithLimit(limit);

    this.productCacheService.setAllProducts(products);

    return products;
  }

  async getAllProducts() {
    const cachedProducts = await this.productCacheService.getAllProducts();

    if (cachedProducts) {
      return cachedProducts;
    }

    const products = await this.productRepository.findAll();

    this.productCacheService.setAllProducts(products);

    return products;
  }

  async getProductById(id: string) {
    if (id.trim() === "") {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.BAD_REQUEST,
        "Invalid Request"
      );
    }

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

    this.productCacheService.setProductById(id, product);

    return product;
  }

  async getProductsByName(name: string) {
    if (name.trim() === "") {
      return await this.getAllProducts();
    }

    const cachedProducts = await this.productCacheService.getProductsByName(
      name.trim()
    );

    if (cachedProducts) {
      return cachedProducts;
    }

    const products = await this.productRepository.findByName(name.trim());

    this.productCacheService.setProductsByName(name.trim(), products);

    return products;
  }

  async createProduct(data: CreateProductDTO) {
    AppLogger.info("Product: ", data);

    const attributesTemplate: Record<string, (string | number)[]> =
      data.variants
        ? ProductHelper.genAttributeTemplateFromVariant(data.variants)
        : {};

    const slug = ProductHelper.generateSlug(data.name);

    const product = new Product({
      ...data,
      attributesTemplate: attributesTemplate,
      slug: slug,
      status: data.status,
      variants: data.variants.map(
        (variant) =>
          new ProductVariant({
            ...variant,
            sku: ProductHelper.generateSKU(
              data.brand ?? "",
              slug,
              variant.attributes
            ),
          })
      ),
    });

    await this.productCacheService.invalidateProductCache();

    return await this.productRepository.create(product);
  }

  async updateProduct(id: string, data: UpdateProductDTO) {
    if (id.trim() === "") {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.BAD_REQUEST,
        "Invalid Request"
      );
    }

    const currentProduct: Product = new Product(await this.getProductById(id));

    const attributesTemplate: Record<string, (string | number)[]> =
      data.variants
        ? ProductHelper.genAttributeTemplateFromVariant(data.variants)
        : currentProduct.attributesTemplate;

    const slug = ProductHelper.generateSlug(data.name ?? currentProduct.name);

    const updatedProduct = await this.productRepository.update(
      id,
      currentProduct.copyWith({
        ...data,
        attributesTemplate: attributesTemplate,
        slug: slug,
        variants: data.variants?.map(
          (variant) =>
            new ProductVariant({
              ...variant,
              sku: ProductHelper.generateSKU(
                data.brand ?? "",
                slug,
                variant.attributes
              ),
            })
        ),
      })
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
  }

  async deleteProduct(id: string) {
    await this.productCacheService.invalidateProductCache(id);
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
