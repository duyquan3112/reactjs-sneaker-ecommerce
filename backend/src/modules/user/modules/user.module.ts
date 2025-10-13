import { UsersRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { IUserService } from "../interfaces/user-service.interface";
import { PostgresDatasource } from "../../../config/postgres-database";
import { User } from "../entities/user.entity";

const userRepository = new UsersRepository(
  PostgresDatasource.getRepository(User)
);
const userService: IUserService = new UserService(userRepository);
const userController = new UserController(userService);

export default userController;
