import { StatusCodes } from 'http-status-codes';
import {
  getSwaggerRequestBodySchema,
  getSwaggerResponseBodySchema,
} from '@utils/swagger/getSwaggerSchema';

const loginUserRequestBody = getSwaggerRequestBodySchema({
  isRequired: true,
  requiredFields: ['email', 'password'],
  requestBody: {
    email: 'pelusa@gmail.com',
    password: 'abc123',
  },
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'Login existing user',
  responseBody: {
    message: 'Successfully logged in',
    tokens: {
      access: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmFiMTYxY2U4YzRmMGU0MjhhZGVhZWQiLCJpYXQiOjE2NTU2NDI3MDIsImV4cCI6MTY1NTcyOTEwMiwidHlwZSI6ImFjY2VzcyJ9.bdUCfq_wrKCsw4682R_PQq3Bgt3N54xugMHQNKU3wvU',
        expires: '2022-06-20T12:45:02.512Z',
      },
      refresh: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmFiMTYxY2U4YzRmMGU0MjhhZGVhZWQiLCJpYXQiOjE2NTU2NDI3MDIsImV4cCI6MTY1ODIzNDcwMiwidHlwZSI6InJlZnJlc2gifQ.ox6d4MD4SEnNZT0DVYQRWr-iCd4GmOhCZ2Gsl_wgf4g',
        expires: '2022-07-19T12:45:02.512Z',
      },
    },
    user: {
      username: 'Pelusa',
      _id: '62ab161ce8c4f0e428adeaed',
    },
  },
});

const unauthorizedResponse = getSwaggerResponseBodySchema({
  description: 'Invalid email or password',
  responseBody: {
    message: 'Incorrect email or password',
    statusCode: StatusCodes.UNAUTHORIZED,
  },
});

const validationErrorResponse = getSwaggerResponseBodySchema({
  description: 'Validation error on email or password',
  responseBody: {
    validatorErrors: [
      {
        message: '"email" must be a valid email',
        path: ['email'],
        type: 'string.email',
        context: {
          invalids: ['pelusagmail.com'],
          label: 'email',
          key: 'email',
        },
      },
    ],
  },
});

export const login = {
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login user',
      description: 'Logs in existing user',
      requestBody: loginUserRequestBody,
      responses: {
        [StatusCodes.OK]: successResponse,
        [StatusCodes.UNAUTHORIZED]: unauthorizedResponse,
        [StatusCodes.BAD_REQUEST]: validationErrorResponse,
      },
    },
  },
};
