export interface IBaseResponse<T> {
  status: boolean;
  data?: T;
  message?: string;
}

export interface IBaseError {
  message: string;
  detail?: any;
  code?: string; // Optional code: 'NOT_FOUND', 'VALIDATION_ERROR'...
}

export interface IBaseErrorResponse {
  status: boolean;
  error: IBaseError;
}
