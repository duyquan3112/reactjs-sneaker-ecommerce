import { Request, Response, NextFunction } from "express";
import { IProduct } from "./interfaces/IProduct";
import ProductService from "./ProductService";
import MongoProductRepository from "./MongoProductRepository";
import { sendSuccessResponse } from "../../utils/ResponseUtil";
import { HttpStatusCode } from "../../constants/HttpStatusCode";

const repo = MongoProductRepository;
const productService = new ProductService(repo);

const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const products: IProduct[] = await productService.getAllProducts();
  return sendSuccessResponse(res, products);
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const product: IProduct = await productService.getProductById(req.params.id);
  return sendSuccessResponse(res, product);
};

const searchProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const name = req.query.name as string;
  const products: IProduct[] = await productService.getProductsByName(name);
  return sendSuccessResponse(res, products);
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("Request body: ", req.body);
  const newProduct: IProduct = await productService.createProduct(req.body);
  return sendSuccessResponse(
    res,
    newProduct,
    HttpStatusCode.CREATED,
    "Product created successfully"
  );
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("Request body: ", req.body);
  const updatedProduct: IProduct = await productService.updateProduct(
    req.params.id,
    req.body
  );
  return sendSuccessResponse(
    res,
    updatedProduct,
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
  deleteProduct
};
