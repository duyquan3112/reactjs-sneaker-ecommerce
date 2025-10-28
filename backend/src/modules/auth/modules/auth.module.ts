import { userModule } from "../../user/modules/user.module";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { JwtService } from "../services/jwt.service";

const jwtService = new JwtService();

const authService = new AuthService(jwtService);

const authController = new AuthController(authService, userModule.userService);

export const authModule = {
  authService,
  authController
};
