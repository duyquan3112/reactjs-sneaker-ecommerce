import { model, Schema } from "mongoose";
import { IProduct, StatusTypes } from "../interfaces/product.interface";
import z from "zod";
import {
  productVariantValidateSchema,
  variantSchema
} from "./product-variant.model";
import { IProductVariant } from "../interfaces/product-variant.interface";

// https://mongoosejs.com/docs/typescript.html

export const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true }, // example: Air Jordan 1
    slug: { type: String, required: true, unique: true }, // example: air-jordan-1
    brand: { type: String, required: true },
    basePrice: { type: Number, required: true, min: 0 },
    shortDescription: { type: String },
    fullDescription: { type: String },
    images: [{ type: String, required: true }],
    categories: [{ type: String, required: true }],
    variants: [variantSchema], // Array nested schema
    attributesTemplate: {
      type: Schema.Types.Mixed, // Dynamic object { [key: string]: (string | number)[] }
      default: {}
    },
    tags: [{ type: String }],
    status: {
      type: String,
      enum: Object.values(StatusTypes), // Enum từ StatusTypes để validate
      required: true,
      default: StatusTypes.DRAFT
    }
  },
  { timestamps: true }
);

//pre-save hooks
productSchema.pre("save", function (next) {
  this.variants.forEach((v: IProductVariant) => {
    v.available = v.stock > 0;
  });
  next();
});

// validate schema
export const createProductValidateSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  brand: z.string().nonempty({ message: "Brand is required" }),
  images: z.string().array().nonempty({ message: "Images is required" }),
  categories: z
    .string()
    .array()
    .nonempty({ message: "categories is required" }),
  basePrice: z.number().positive({ message: "Base Price must be >= 0" }),
  variants: z
    .array(productVariantValidateSchema)
    .nonempty({ message: "At least one variant is required" })
});

export const updateProductValidateSchema =
  createProductValidateSchema.partial();

export default model<IProduct>("Product", productSchema, "Products");
