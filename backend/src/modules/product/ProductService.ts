import { ErrorCode, HttpStatusCode } from "../../constants/HttpStatusCode";
import { IProduct } from "./interfaces/IProduct";
import { AppError } from "../../utils/AppError";
import { IProductRepository } from "./interfaces/IProductRepository";

class ProductService {
  private readonly productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  async getProducts(limit: number = 18): Promise<IProduct[]> {
    return await this.productRepository.findWithLimit(limit);
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await this.productRepository.findAll();
  }

  async getProductById(id: string): Promise<IProduct> {
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

  async getProductsByName(name: string): Promise<IProduct[]> {
    if (name.trim() === "") {
      return await this.productRepository.findAll();
    }
    return await this.productRepository.findByName(name.trim());
  }

  async createProduct(data: Partial<IProduct>): Promise<IProduct> {
    return await this.productRepository.create(data);
  }

  async updateProduct(id: string, data: Partial<IProduct>): Promise<IProduct> {
    if (id.trim() === "") {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.BAD_REQUEST,
        "Invalid Request"
      );
    }

    const updatedProduct = await this.productRepository.update(id, data);

    if (!updatedProduct) {
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "Product not found!"
      );
    }

    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<Boolean> {
    return await this.productRepository.delete(id);
  }
}

export default ProductService;
