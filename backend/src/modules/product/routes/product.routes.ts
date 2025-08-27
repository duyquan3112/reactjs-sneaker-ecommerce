import { Router } from "express";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import { ProductController } from "../controllers/product.controller";
import { validateDto } from "../../../middlewares/validators.middleware";
import { CreateProductDTO } from "../dtos/request/create-product.dto";
import { UpdateProductDTO } from "../dtos/request/update-product.dto";

const productRouter = Router();

productRouter.get("/all", catchAsync(ProductController.getAllProducts));
productRouter.get("/:id", catchAsync(ProductController.getProductById));
productRouter.post(
  "/create",
  validateDto(CreateProductDTO),
  catchAsync(ProductController.createProduct)
);
productRouter.patch(
  "/update/:id",
  validateDto(UpdateProductDTO),
  catchAsync(ProductController.updateProduct)
);
productRouter.get("/search", catchAsync(ProductController.searchProducts));
productRouter.delete(
  "/delete/:id",
  catchAsync(ProductController.deleteProduct)
);

export default productRouter;
