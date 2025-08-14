import { Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  comparePrice: number;
  shortDescription: string;
  fullDescription: string;
  image: string;
  category: string[];
  sizes: number[];
  colors: string[];
  stockQuantity: number;
  isActive: boolean;
}
