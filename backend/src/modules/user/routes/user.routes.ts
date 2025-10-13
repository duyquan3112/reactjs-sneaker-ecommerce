import { Router } from "express";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import userController from "../modules/user.module";
import { validateDto } from "../../../middlewares/validators.middleware";
import { CreateUserDTO } from "../dtos/request/create-user.dto";

const userRouter = Router();

userRouter.get(
  "/get-all",
  catchAsync(userController.getAllUsers.bind(userController))
);

userRouter.get(
  "/get-user/:id",
  catchAsync(userController.getUserById.bind(userController))
);

userRouter.post(
  "/create",
  validateDto(CreateUserDTO),
  catchAsync(userController.createUser.bind(userController))
);

export default userRouter;
