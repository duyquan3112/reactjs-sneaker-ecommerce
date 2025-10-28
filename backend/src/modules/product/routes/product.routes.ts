import { Router } from "express";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import {
  validateDto,
  validateId
} from "../../../middlewares/validators.middleware";
import { CreateProductDTO } from "../dtos/request/create-product.dto";
import { UpdateProductDTO } from "../dtos/request/update-product.dto";
import { productModule } from "../modules/product.module";
import { AppRegex } from "../../../regexs/app.regex";

const productRouter = Router();

const productController = productModule.productController;

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
  validateId(AppRegex.MONGO_ID_REGEX),
  catchAsync(productController.getProductById.bind(productController))
);
productRouter.post(
  "/create",
  validateDto(CreateProductDTO),
  catchAsync(productController.createProduct.bind(productController))
);
productRouter.patch(
  "/update/:id",
  validateId(AppRegex.MONGO_ID_REGEX),
  validateDto(UpdateProductDTO),
  catchAsync(productController.updateProduct.bind(productController))
);
productRouter.get(
  "/search",
  catchAsync(productController.searchProducts.bind(productController))
);
productRouter.delete(
  "/delete/:id",
  validateId(AppRegex.MONGO_ID_REGEX),
  catchAsync(productController.deleteProduct.bind(productController))
);

export default productRouter;
