import { ExpressJoiError } from 'express-joi-validation';
import { cleanData } from '@utils/cleanData';
import express from 'express';
import httpStatus, { ReasonPhrases } from 'http-status-codes';

export const validatorResponseMessage = (
  err: ExpressJoiError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (err) {
    cleanData(err);

    return res.status(httpStatus.BAD_REQUEST).json({
      validatorErrors: err.error?.details,
    });
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};
