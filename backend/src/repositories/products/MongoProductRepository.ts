import { Collection, Db } from "mongodb";
import { IProductRepository } from "./IProductRepository";
import { IProduct } from "../../interfaces/products/IProduct";

export class MongoProductRepository implements IProductRepository {
    private readonly collection: Collection<IProduct>;

    constructor(db: Db) {
        this.collection = db.collection<IProduct>("products");
    }

    // CRUD Implementations
    findByName(name: string): Promise<IProduct[] | null> {
        throw new Error("Method not implemented.");
    }
    create(data: Partial<IProduct>): Promise<IProduct> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<IProduct | null> {
        throw new Error("Method not implemented.");
    }
    findAll(): Promise<IProduct[]> {
        throw new Error("Method not implemented.");
    }
    update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
}