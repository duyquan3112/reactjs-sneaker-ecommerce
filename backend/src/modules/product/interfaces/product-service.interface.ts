import { IProduct } from "./product.interface";
import { CreateProductDTO } from "../dtos/request/create-product.dto";
import { UpdateProductDTO } from "../dtos/request/update-product.dto";

export interface IProductService {
  getProducts(limit?: number): Promise<IProduct[]>;

  getAllProducts(): Promise<IProduct[]>;

  getHomeProducts(limit: number): Promise<IProduct[]>;

  getProductById(id: string): Promise<IProduct>;

  getProductsByName(name: string): Promise<IProduct[]>;

  createProduct(data: CreateProductDTO): Promise<IProduct>;

  updateProduct(id: string, data: UpdateProductDTO): Promise<IProduct>;

  deleteProduct(id: string): Promise<boolean>;
}
