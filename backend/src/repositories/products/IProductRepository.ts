import { IProduct } from "../../interfaces/products/IProduct";
import { IBaseRepository } from "../IBaseRepository";

export interface IProductRepository extends IBaseRepository<IProduct> {
    findByName(name: string): Promise<IProduct[] | null>;   
}