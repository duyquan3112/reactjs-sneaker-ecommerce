import { Router } from "express";
import productRouter from "../modules/product/ProductRoutes";

const appRouter = Router();

// Product module
appRouter.use("/product", productRouter);

export default appRouter;
