import { Router } from "express";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import { ProductController } from "../controllers/product.controller";
import { Validator } from "../../../middlewares/validators.middleware";
import {
  createProductValidateSchema,
  updateProductValidateSchema
} from "../models/product.model";

const productRouter = Router();

productRouter.get("/all", catchAsync(ProductController.getAllProducts));
productRouter.get("/:id", catchAsync(ProductController.getProductById));
productRouter.post(
  "/create",
  Validator.ProductValidator(createProductValidateSchema),
  catchAsync(ProductController.createProduct)
);
productRouter.patch(
  "/update/:id",
  Validator.ProductValidator(updateProductValidateSchema),
  catchAsync(ProductController.updateProduct)
);
productRouter.get("/search", catchAsync(ProductController.searchProducts));
productRouter.delete(
  "/delete/:id",
  catchAsync(ProductController.deleteProduct)
);

export default productRouter;
