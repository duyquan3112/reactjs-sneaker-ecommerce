import { Router } from "express";
import productRouter from "../modules/product/routes/product.routes";

const appRouter = Router();

// Product module
appRouter.use("/product", productRouter);

export default appRouter;
