import { Router } from "express";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import { userModule } from "../modules/user.module";
import {
  validateDto,
  validateId
} from "../../../middlewares/validators.middleware";
import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";
import { AppRegex } from "../../../regexs/app.regex";

const userRouter = Router();

const userController = userModule.userController;

userRouter.get(
  "/get-all",
  catchAsync(userController.getAllUsers.bind(userController))
);

userRouter.get(
  "/get-user/:id",
  validateId(AppRegex.UUID_REGEX),
  catchAsync(userController.getUserById.bind(userController))
);

userRouter.post(
  "/create",
  validateDto(CreateUserDTO),
  catchAsync(userController.createUser.bind(userController))
);

userRouter.patch(
  "/update/:id",
  validateId(AppRegex.UUID_REGEX),
  validateDto(UpdateUserDTO),
  catchAsync(userController.updateUser.bind(userController))
);

export default userRouter;
