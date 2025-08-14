import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";
import { IBaseErrorResponse } from "../interfaces/IBaseResponse";
import { ErrorCode, HttpStatusCode } from "../constants/HttpStatusCode";

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
        code: error.errorCode
      }
    };

    return res.status(error.statusCode).json(body);
  }

  const body: IBaseErrorResponse = {
    status: false,
    error: {
      message: error.message,
      code: ErrorCode.INTERNAL_SERVER_ERROR
    }
  };

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json(body);
};

export const catchAsync = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(func(req, res, next)).catch(next);
  };
};
