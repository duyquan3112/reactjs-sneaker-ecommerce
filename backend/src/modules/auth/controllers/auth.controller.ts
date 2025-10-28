import { NextFunction, Request, Response } from "express";
import { LoginDTO } from "../dtos/request/login.dto";
import { AuthResponseDTO } from "../dtos/response/auth-response.dto";
import { plainToInstance } from "class-transformer";
import {
  sendResponse,
  sendSuccessResponse
} from "../../../utils/response.util";
import { AppLogger } from "../../../utils/app-logger.util";
import { IUserService } from "../../user/interfaces/user-service.interface";
import { IAuthService } from "../interfaces/auth-service.interface";
import { UserResponseDTO } from "../../user/dtos/response/user-response.dto";
import { RegisterDTO } from "../dtos/request/register.dto";
import { HttpStatusCode } from "../../../constants/http-status-code.constant";
import { TokenPairResponseDTO } from "../dtos/response/token-pair-response.dto";

export class AuthController {
  private readonly authService: IAuthService;
  private readonly userService: IUserService;

  constructor(authService: IAuthService, userService: IUserService) {
    this.authService = authService;
    this.userService = userService;
  }

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const body = plainToInstance(LoginDTO, req.body);

    AppLogger.info("Login request: ", JSON.stringify(body));

    const tokenPair = await this.authService.login(body);

    const user = await this.userService.getUserByEmail(body.email);

    const tokenResponse = plainToInstance(TokenPairResponseDTO, tokenPair, {
      excludeExtraneousValues: true
    });

    const userResponse = plainToInstance(UserResponseDTO, user, {
      excludeExtraneousValues: true
    });

    const response = plainToInstance(
      AuthResponseDTO,
      { tokens: tokenResponse, user: userResponse },
      {
        excludeExtraneousValues: true
      }
    );

    return sendSuccessResponse(res, response);
  }

  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const body = plainToInstance(RegisterDTO, req.body);

    AppLogger.info("Register request: ", JSON.stringify(body));

    await this.authService.register(body);

    return sendSuccessResponse(res, { result: true });
  }
}
