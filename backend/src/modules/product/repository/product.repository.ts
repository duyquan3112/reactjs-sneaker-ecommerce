import { IProductRepository } from "../interfaces/product-repository.interface";
import { IProduct } from "../interfaces/product.interface";
import ProductModel from "../models/product.model";

export class MongoProductRepository implements IProductRepository {
  // CRUD Implementations

  async findWithLimit(limit: number): Promise<IProduct[]> {
    return await ProductModel.find().limit(limit);
  }

  async findByName(name: string): Promise<IProduct[]> {
    return await ProductModel.find({ name: { $regex: name, $options: "i" } });
  }

  async create(data: Partial<IProduct>): Promise<IProduct> {
    const newProduct = new ProductModel(data);
    return await newProduct.save();
  }

  async findById(id: string): Promise<IProduct | null> {
    return await ProductModel.findById(id);
  }

  async findAll(): Promise<IProduct[]> {
    return await ProductModel.find();
  }

  async update(id: string, data: Partial<IProduct>): Promise<IProduct | null> {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    return (await ProductModel.findByIdAndDelete(id)) ?? false;
  }
}

export default new MongoProductRepository();
