export class AppError extends Error {
  statusCode: number;
  errorCode?: string;

  details?: any;

  constructor(
    statusCode: number,
    errorCode: string,
    message: string,
    details?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.details = details;
  }
}
