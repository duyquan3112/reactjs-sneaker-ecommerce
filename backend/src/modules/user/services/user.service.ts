import { IUserRepository } from "../interfaces/user-repository.interface";
import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";
import { IUserService } from "../interfaces/user-service.interface";
import { User } from "../entities/user.entity";
import { plainToInstance } from "class-transformer";
import { UserHelper } from "../helpers/user.helper";
import { AppError } from "../../../utils/app-error.util";
import {
  ErrorCode,
  HttpStatusCode
} from "../../../constants/http-status-code.constant";
import { IUser } from "../interfaces/user.interface";
import { EntityManager } from "typeorm";

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(user: CreateUserDTO) {
    const createUserData = UserHelper.buildCreateUserFromDTO(user);
    return this.userRepository.create(createUserData);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "User not found!"
      );
    }

    return user;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "User not found!"
      );
    }

    return user;
  }

  async getUsers() {
    return await this.userRepository.findAll();
  }

  async updateUser(id: string, user: UpdateUserDTO) {
    const currentUserData = await this.getUserById(id);

    if (!currentUserData) {
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "User not found!"
      );
    }

    const currentUser = plainToInstance(User, currentUserData);
    const updateUserData = UserHelper.buildUpdateUserFromDTO(user, currentUser);
    const updatedUser = await this.userRepository.update(id, updateUserData);

    if (!updatedUser) {
      throw new AppError(
        HttpStatusCode.INTERNAL_SERVER_ERROR,
        ErrorCode.INTERNAL_SERVER_ERROR,
        "Failed to update user!"
      );
    }

    return updatedUser;
  }

  async deleteUser(id: string) {
    return this.userRepository.delete(id);
  }

  async checkExistByEmail(email: string) {
    return this.userRepository.checkExistByEmail(email);
  }
}
