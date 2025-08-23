import { Document } from "mongoose";
import { IProductVariant } from "./product-variant.interface";

export enum StatusTypes {
  ACTIVE = "ACTIVE",
  OUT_OF_STOCK = "OUT-OF-STOCK",
  DRAFT = "DRAFT",
  ARCHIVED = "ARCHIVED"
}

export interface IProduct extends Document {
  name: string;
  slug: string;
  brand: string;
  basePrice: number;
  shortDescription?: string;
  fullDescription?: string;
  images: string[];
  categories: string[];
  variants: IProductVariant[];
  attributesTemplate: Record<string, (string | number)[]>;
  tags?: string[];
  status: StatusTypes;
}
