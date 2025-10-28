import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { UserResponseDTO } from "../dtos/response/user-response.dto";
import { sendSuccessResponse } from "../../../utils/response.util";
import { IUserService } from "../interfaces/user-service.interface";
import { CreateUserDTO } from "../dtos/request/create-user.dto";
import { HttpStatusCode } from "../../../constants/http-status-code.constant";
import { AppLogger } from "../../../utils/app-logger.util";
import { UpdateUserDTO } from "../dtos/request/update-user.dto";

export class UserController {
  private readonly userService: IUserService;

  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async getAllUsers(req: Request, res: Response, next: NextFunction) {
    const users = await this.userService.getUsers();
    const response = plainToInstance(UserResponseDTO, users, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    });
    return sendSuccessResponse(res, response);
  }

  async createUser(req: Request, res: Response, next: NextFunction) {
    AppLogger.info("Create user request:", JSON.stringify(req.body));
    const body = plainToInstance(CreateUserDTO, req.body);

    const newUser = await this.userService.createUser(body);

    const response = plainToInstance(UserResponseDTO, newUser, {
      excludeExtraneousValues: true,
    });

    return sendSuccessResponse(
      res,
      response,
      HttpStatusCode.CREATED,
      "User created successfully"
    );
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const user = await this.userService.getUserById(id);

    const response = plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true,
    });

    return sendSuccessResponse(res, response);
  }

  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const body = plainToInstance(UpdateUserDTO, req.body);

    const updatedUser = await this.userService.updateUser(id, body);

    const response = plainToInstance(UserResponseDTO, updatedUser, {
      excludeExtraneousValues: true,
    });

    return sendSuccessResponse(res, response);
  }
}
