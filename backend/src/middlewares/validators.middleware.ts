import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "../utils/app-error.util";
import {
  ErrorCode,
  HttpStatusCode
} from "../constants/http-status-code.constant";

export function validateDto(dtoClass: any) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const dtoObject = plainToInstance(dtoClass, req.body);
    const errors = await validate(dtoObject);
    if (errors.length) {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.BAD_REQUEST,
        "Validation failed",
        errors
      );
    }
    next();
  };
}
