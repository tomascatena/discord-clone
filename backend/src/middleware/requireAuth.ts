import { ApiError } from '@utils/ApiError';
import { NextFunction, Response } from 'express';
import { RequestWithBody } from '../typings/typings';
import { env } from '@config/config';
import { joiValidator } from './joiValidator';
import JWT from 'jsonwebtoken';
import Joi from 'joi';
import httpStatus, { ReasonPhrases } from 'http-status-codes';
import validatorJS from 'validator';

const requireAuthSchema = Joi.object({
  authorization: Joi.string()
    .trim()
    .required()
    .custom((value, helpers) => {
      const [bearer, jwt] = value.split(' ');

      if (bearer !== 'Bearer') {
        return helpers.error('any.invalid');
      }

      if (!(jwt && validatorJS.isJWT(jwt))) {
        return helpers.error('any.invalid');
      }

      return value;
    }),
});

export const requireAuth = [
  joiValidator.headers(requireAuthSchema),
  (req: RequestWithBody, res: Response, next: NextFunction) => {
    const token = req.headers.authorization!.split(' ')[1];

    try {
      const decoded = JWT.verify(token, env.JWT_SECRET);

      req.userId = decoded.sub as string;
    } catch (error) {
      throw new ApiError({
        statusCode: httpStatus.UNAUTHORIZED,
        message: ReasonPhrases.UNAUTHORIZED,
        isOperational: false,
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    next();
  },
];
