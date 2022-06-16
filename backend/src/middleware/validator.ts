import { createValidator } from 'express-joi-validation';
import httpStatus from 'http-status-codes';

export const validator = createValidator({
  statusCode: httpStatus.BAD_REQUEST,

  // This options forces validation to pass any errors the express
  // error handler instead of generating a 400 error
  passError: true,
});
