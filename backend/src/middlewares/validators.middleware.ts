import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/app-error.util";
import { ErrorCode, HttpStatusCode } from "../constants/http-status-code.constant";

const ProductValidator =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.BAD_REQUEST,
        "Validation failed",
        result.error.issues.map((iss) => iss.path.join(".") + ": " + iss.message)
      );
    }
    req.body = result.data;
    next();
  };

export const Validator = {
  ProductValidator
};
