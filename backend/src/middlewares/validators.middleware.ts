import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { AppError } from "../utils/app-error.util";
import {
  ErrorCode,
  HttpStatusCode,
} from "../constants/http-status-code.constant";
import { AppLogger } from "../utils/app-logger.util";

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

export function validateId(pattern: RegExp) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const id = req.params?.id || req.query?.id || req.body?.id;

    if (!id || id.trim() === "") {
      AppLogger.error(`Invalid ID provided: ${id}`);
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "Not found"
      );
    }

    if (!pattern.test(id)) {
      AppLogger.error(`Invalid ID provided: ${id}`);
      throw new AppError(
        HttpStatusCode.NOT_FOUND,
        ErrorCode.NOT_FOUND,
        "Not found"
      );
    }
    next();
  };
}
