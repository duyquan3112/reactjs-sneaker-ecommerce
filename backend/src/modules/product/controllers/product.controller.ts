import { Request, Response, NextFunction } from "express";
import { IProduct } from "../interfaces/product.interface";
import { IProductService } from "../interfaces/product-service.interface";
import { sendSuccessResponse } from "../../../utils/response.util";
import { HttpStatusCode } from "../../../constants/http-status-code.constant";
import { AppLogger } from "../../../utils/app-logger.util";
import { plainToInstance } from "class-transformer";
import { CreateProductDTO } from "../dtos/request/create-product.dto";
import { ProductResponseDTO } from "../dtos/response/product-response.dto";
import { UpdateProductDTO } from "../dtos/request/update-product.dto";
import { DEFAULT_PRODUCT_LIMIT } from "../../../constants/app.constant";

export class ProductController {
  private readonly productService: IProductService;

  constructor(productService: IProductService) {
    this.productService = productService;
  }

  async getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const products = await this.productService.getAllProducts();

    const response = plainToInstance(ProductResponseDTO, products, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    return sendSuccessResponse(res, response);
  }

  async getHomeProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const products = await this.productService.getHomeProducts(
      DEFAULT_PRODUCT_LIMIT
    );

    const response = plainToInstance(ProductResponseDTO, products, {
      excludeExtraneousValues: true,
    });

    return sendSuccessResponse(res, response);
  }

  async getProductById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const product = await this.productService.getProductById(req.params.id);

    const response = plainToInstance(ProductResponseDTO, product, {
      excludeExtraneousValues: true,
    });

    return sendSuccessResponse(res, response);
  }

  async searchProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const name = req.query.name as string;

    const products: IProduct[] =
      await this.productService.getProductsByName(name);

    const response = plainToInstance(ProductResponseDTO, products, {
      excludeExtraneousValues: true,
    });

    return sendSuccessResponse(res, response);
  }

  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    AppLogger.info("Create product request: ", req.body);

    const body = plainToInstance(CreateProductDTO, req.body);

    AppLogger.info("Body: ", body);

    const newProduct = await this.productService.createProduct(body);

    AppLogger.info("New product: ", newProduct);

    const response = plainToInstance(ProductResponseDTO, newProduct, {
      excludeExtraneousValues: true,
    });
    AppLogger.info("Create success: ", response);
    return sendSuccessResponse(
      res,
      response,
      HttpStatusCode.CREATED,
      "Product created successfully"
    );
  }

  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body = plainToInstance(UpdateProductDTO, req.body);

    AppLogger.info("Update product request: ", body);

    const updatedProduct: IProduct = await this.productService.updateProduct(
      req.params.id,
      body
    );

    const response = plainToInstance(ProductResponseDTO, updatedProduct, {
      excludeExtraneousValues: true,
    });

    AppLogger.info("Update product response: ", response);

    return sendSuccessResponse(
      res,
      response,
      HttpStatusCode.OK,
      "Product updated successfully"
    );
  }

  async deleteProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    await this.productService.deleteProduct(req.params.id);
    res.status(HttpStatusCode.NO_CONTENT).send();
  }
}
