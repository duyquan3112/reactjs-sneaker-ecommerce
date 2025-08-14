import { HttpStatusCode } from "../constants/HttpStatusCode";
import { IBaseResponse } from "../interfaces/IBaseResponse";
import { Response } from "express";

export const sendResponse = <T>(
  res: Response,
  status: boolean,
  statusCode: number,
  data?: T,
  message?: string
) => {
  const response: IBaseResponse<T> = {
    status: status,
    data: data,
    message: message
  };

  res.status(statusCode).json(response);
};

export const sendSuccessResponse = <T>(
  res: Response,
  data: T,
  statusCode: number = HttpStatusCode.OK,
  message?: string
) => {
  sendResponse(res, true, statusCode, data, message);
};
