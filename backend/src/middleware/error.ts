import { ApiError } from '@/utils/ApiError';
import { Logger, LoggerToFile } from '@/config/logger';
import { NextFunction, Request, Response } from 'express';
import { env } from '@/config/config';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import mongoose from 'mongoose';

export const transformErrorToAPIError = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error
        ? httpStatus.BAD_REQUEST
        : httpStatus.INTERNAL_SERVER_ERROR;

    const message = error.message || ReasonPhrases.INTERNAL_SERVER_ERROR;

    error = new ApiError({
      statusCode,
      message,
      isOperational: false,
      stack: err.stack,
    });
  }

  next(error);
};

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  let { statusCode, message } = err;

  if (env.NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = ReasonPhrases.INTERNAL_SERVER_ERROR;
  }

  res.locals.errorMessage = err.message;

  if (env.NODE_ENV === 'development') {
    Logger.error(err);
  }

  LoggerToFile.error({
    message: err.message,
    name: err.name,
    isOperational: err.isOperational,
    stack: err.stack,
    statusCode: err.statusCode,
  });

  res.status(statusCode).json({
    statusCode,
    message,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};
