import { model, Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";
import z from "zod";

// https://mongoosejs.com/docs/typescript.html

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be equal or greater than 0"]
    },
    comparePrice: {
      type: Number,
      min: [0, "Compare price must be equal or greater than 0"]
    },
    shortDescription: {
      type: String,
      trim: true
    },
    fullDescription: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: [String]
    },
    sizes: {
      type: [Number]
    },
    colors: {
      type: [String]
    },
    stockQuantity: {
      type: Number,
      required: true,
      min: [0, "Stock quantity must be equal or greater than 0"]
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // Unix time
  }
);

// validate schema
export const createProductValidateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be >= 0"),
  comparePrice: z.number().min(0, "Compare price must be >= 0"),
  stockQuantity: z.number().min(0, "Quantity must be >= 0"),
  image: z.string().min(1, "Image is required")
});

export const updateProductValidateSchema =
  createProductValidateSchema.partial();

export default model<IProduct>("Product", productSchema, "Products");
