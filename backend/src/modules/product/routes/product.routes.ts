import { Router } from "express";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import { validateDto } from "../../../middlewares/validators.middleware";
import { CreateProductDTO } from "../dtos/request/create-product.dto";
import { UpdateProductDTO } from "../dtos/request/update-product.dto";
import { productController } from "../modules/product.module";

const productRouter = Router();

productRouter.get(
  "/all",
  catchAsync(productController.getAllProducts.bind(productController))
);
productRouter.get(
  "/home",
  catchAsync(productController.getHomeProducts.bind(productController))
);
productRouter.get(
  "/:id",
  catchAsync(productController.getProductById.bind(productController))
);
productRouter.post(
  "/create",
  validateDto(CreateProductDTO),
  catchAsync(productController.createProduct.bind(productController))
);
productRouter.patch(
  "/update/:id",
  validateDto(UpdateProductDTO),
  catchAsync(productController.updateProduct.bind(productController))
);
productRouter.get(
  "/search",
  catchAsync(productController.searchProducts.bind(productController))
);
productRouter.delete(
  "/delete/:id",
  catchAsync(productController.deleteProduct.bind(productController))
);

export default productRouter;
