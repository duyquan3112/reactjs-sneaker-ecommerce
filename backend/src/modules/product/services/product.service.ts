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

class ProductService {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getProducts(limit: number = DEFAULT_PRODUCT_LIMIT) {
    return await this.productRepository.findWithLimit(limit);
  }

  async getAllProducts() {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string) {
    if (id.trim() === "") {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.BAD_REQUEST,
        "Invalid Request"
      );
    }

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "Product not found!"
      );
    }

    return product;
  }

  async getProductsByName(name: string) {
    if (name.trim() === "") {
      return await this.productRepository.findAll();
    }
    return await this.productRepository.findByName(name.trim());
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

    return updatedProduct;
  }

  async deleteProduct(id: string) {
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
