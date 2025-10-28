import { Router } from "express";
import { validateDto } from "../../../middlewares/validators.middleware";
import { LoginDTO } from "../dtos/request/login.dto";

import { authModule } from "../modules/auth.module";
import { catchAsync } from "../../../middlewares/error-handler.middleware";
import { RegisterDTO } from "../dtos/request/register.dto";

const authRoute = Router();
const authController = authModule.authController;

authRoute.post(
  "/login",
  validateDto(LoginDTO),
  catchAsync(authController.login.bind(authController))
);

authRoute.post(
  "/register",
  validateDto(RegisterDTO),
  catchAsync(authController.register.bind(authController))
);

export default authRoute;
