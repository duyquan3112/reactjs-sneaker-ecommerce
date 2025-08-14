import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/AppError";
import { ErrorCode, HttpStatusCode } from "../constants/HttpStatusCode";

const ProductValidator =
  (schema: ZodType) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new AppError(
        HttpStatusCode.BAD_REQUEST,
        ErrorCode.BAD_REQUEST,
        "",
        result.error.issues.map((iss) => iss.message)
      );
    }
    next();
  };

export const Validator = {
  ProductValidator
};
