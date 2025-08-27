import { Document, model, Schema } from "mongoose";
import { IProductVariant } from "../interfaces/product-variant.interface";

export const variantSchema = new Schema<IProductVariant & Document>({
  sku: { type: String, required: true, unique: true },
  attributes: { type: Schema.Types.Mixed, required: true },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  weight: { type: Number, min: 0 },
  images: [{ type: String }],
  available: { type: Boolean, default: true },
});

export default model<IProductVariant>(
  "ProductVariant",
  variantSchema,
  "ProductVariants"
);
