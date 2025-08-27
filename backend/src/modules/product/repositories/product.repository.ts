import { IProductRepository } from "../interfaces/product-repository.interface";
import { IProduct } from "../interfaces/product.interface";
import ProductModel from "../models/product.model";

export class MongoProductRepository implements IProductRepository {
  // CRUD Implementations

  async findWithLimit(limit: number) {
    return await ProductModel.find().limit(limit).lean();
  }

  async findByName(name: string) {
    return await ProductModel.find({
      name: { $regex: name, $options: "i" },
    }).lean();
  }

  async create(data: IProduct) {
    const newProduct = new ProductModel(data);
    return await newProduct.save();
  }

  async findById(id: string) {
    return await ProductModel.findById(id).lean();
  }

  async findAll() {
    return await ProductModel.find().lean();
  }

  async update(id: string, data: Partial<IProduct>) {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    return (await ProductModel.findByIdAndDelete(id)) ?? false;
  }
}

export default new MongoProductRepository();
