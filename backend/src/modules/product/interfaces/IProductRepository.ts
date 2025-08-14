import { IProduct } from "./IProduct";
import { IBaseRepository } from "../../../interfaces/IBaseRepository";

export interface IProductRepository extends IBaseRepository<IProduct> {
  findByName(name: string): Promise<IProduct[]>;
  findWithLimit(limit: number): Promise<IProduct[]>;
}
