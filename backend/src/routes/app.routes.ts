import { Router } from "express";
import productRouter from "../modules/product/routes/product.routes";
import userRouter from "../modules/user/routes/user.routes";
import authRoute from "../modules/auth/routes/auth.route";

const appRouter = Router();

// Product module
appRouter.use("/product", productRouter);

// User module
appRouter.use("/user", userRouter);

// Auth module
appRouter.use("/auth", authRoute);

export default appRouter;
