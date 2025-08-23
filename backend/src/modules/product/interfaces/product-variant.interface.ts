import { Document, InferSchemaType, Schema } from "mongoose";

export interface IProductVariant extends Document {
  sku: string;
  attributes: Record<string, string | number>;
  price: number;
  comparePrice?: number;
  stock: number;
  weight?: number;
  images?: string[];
  available?: boolean;
}
