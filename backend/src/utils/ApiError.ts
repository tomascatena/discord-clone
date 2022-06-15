interface ApiErrorConstructor {
  statusCode: number;
  message: string;
  isOperational?: boolean;
  stack?: string;
}
export class ApiError extends Error {
  statusCode: number;

  isOperational: boolean;

  constructor({
    statusCode,
    message,
    isOperational = true,
    stack = '',
  }: ApiErrorConstructor) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
