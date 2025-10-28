import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.util";
import { IBaseErrorResponse } from "../interfaces/base-response.interface";
import {
  ErrorCode,
  HttpStatusCode,
} from "../constants/http-status-code.constant";
import { AppLogger } from "../utils/app-logger.util";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof AppError) {
    const body: IBaseErrorResponse = {
      status: false,
      error: {
        message: error.message,
        detail: error.details,
        code: error.errorCode,
      },
    };

    return res.status(error.statusCode).json(body);
  }

  const body: IBaseErrorResponse = {
    status: false,
    error: {
      message: "Something went wrong!",
      code: ErrorCode.INTERNAL_SERVER_ERROR,
    },
  };
  AppLogger.error("Unexpected Error:", error);

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(body);
};

// Catch async errors, automatically wrap them in AppError
export const catchAsync = (
  func: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<unknown> | unknown
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};
