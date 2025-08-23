import { IProduct } from "./product.interface";
import { IBaseRepository } from "../../../interfaces/base-repository.interface";

export interface IProductRepository extends IBaseRepository<IProduct> {
  findByName(name: string): Promise<IProduct[]>;
  findWithLimit(limit: number): Promise<IProduct[]>;
}
