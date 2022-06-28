import { ExpressJoiError } from 'express-joi-validation';
import { cleanData } from '@/utils/cleanData';
import express from 'express';
import httpStatus from 'http-status-codes';

const containerTypes = ['body', 'query', 'headers', 'fields', 'params'];

export const validatorResponseMessage = (
  err: ExpressJoiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (err && containerTypes.includes(err.type)) {
    cleanData(err);

    return res.status(httpStatus.BAD_REQUEST).json({
      validatorErrors: err.error?.details,
    });
  }

  next(err);
};
