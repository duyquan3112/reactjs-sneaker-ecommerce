import { Request, Response, NextFunction } from "express";
import { IProduct } from "../interfaces/product.interface";
import ProductService from "../services/product.service";
import MongoProductRepository from "../repositories/product.repository";
import { sendSuccessResponse } from "../../../utils/response.util";
import { HttpStatusCode } from "../../../constants/http-status-code.constant";
import { AppLogger } from "../../../utils/app-logger.util";
import { plainToInstance } from "class-transformer";
import { CreateProductDTO } from "../dtos/request/create-product.dto";
import { ProductResponseDTO } from "../dtos/response/product-response.dto";
import { UpdateProductDTO } from "../dtos/request/update-product.dto";
import { ProductCacheService } from "../cache/product-cache.service";
import { RedisCacheService } from "../../../cache/redis/redis-cache.service";

const repo = MongoProductRepository;
const cacheService = new ProductCacheService(new RedisCacheService());
const productService = new ProductService(repo, cacheService);

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const products = await productService.getAllProducts();

  const response = plainToInstance(ProductResponseDTO, products, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });
  return sendSuccessResponse(res, response);
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const product = await productService.getProductById(req.params.id);

  const response = plainToInstance(ProductResponseDTO, product, {
    excludeExtraneousValues: true,
  });

  return sendSuccessResponse(res, response);
};

const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name = req.query.name as string;

  const products: IProduct[] = await productService.getProductsByName(name);

  const response = plainToInstance(ProductResponseDTO, products, {
    excludeExtraneousValues: true,
  });

  return sendSuccessResponse(res, response);
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  AppLogger.info("Create product request: ", req.body);

  const body = plainToInstance(CreateProductDTO, req.body);

  AppLogger.info("Body: ", body);

  const newProduct = await productService.createProduct(body);

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
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const body = plainToInstance(UpdateProductDTO, req.body);

  AppLogger.info("Update product request: ", body);

  const updatedProduct: IProduct = await productService.updateProduct(
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
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await productService.deleteProduct(req.params.id);
  res.status(HttpStatusCode.NO_CONTENT).send();
};

export const ProductController = {
  getAllProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
