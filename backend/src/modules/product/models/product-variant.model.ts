import { Schema } from "mongoose";
import { IProductVariant } from "../interfaces/product-variant.interface";
import { z } from "zod";

export const variantSchema = new Schema<IProductVariant>({
  sku: { type: String, required: true, unique: true },
  attributes: { type: Schema.Types.Mixed, required: true },
  price: { type: Number, required: true, min: 0 },
  comparePrice: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  weight: { type: Number, min: 0 },
  images: [{ type: String }],
  available: { type: Boolean, default: true }
});

//validate
export const productVariantValidateSchema = z.object({
  attributes: z.record(z.string(), z.union([z.string(), z.number()])),
  price: z.number().min(0, { message: "Price must be at least 0" }),
  comparePrice: z
    .number()
    .min(0, { message: "Compare price must be >= 0" })
    .optional(),
  stock: z.number().min(0, { message: "Stock must be >= 0" }),
  weight: z
    .number()
    .positive({ message: "Weight must be positive" })
    .optional(),
  images: z.url({ message: "Image must be a valid URL" }).optional(),
  available: z.boolean().optional()
});
