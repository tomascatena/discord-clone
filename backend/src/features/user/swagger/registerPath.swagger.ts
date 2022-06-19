import { StatusCodes } from 'http-status-codes';
import {
  getSwaggerRequestBodySchema,
  getSwaggerResponseBodySchema,
} from '@utils/swagger/getSwaggerResponseBodySchema';

const registerUserRequestBody = getSwaggerRequestBodySchema({
  requiredFields: ['username', 'email', 'password', 'confirmPassword'],
  requestBody: {
    username: 'Pelusa',
    email: 'pelusa@gmail.com',
    password: 'abc123',
    confirmPassword: 'abc123',
  },
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'New user is created',
  responseBody: {
    message: 'New user successfully registered',
    tokens: {
      access: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmFmMmVjZWRiNzAyYzI3ODJiNTdjNWIiLCJpYXQiOjE2NTU2NDc5NTEsImV4cCI6MTY1NTczNDM1MSwidHlwZSI6ImFjY2VzcyJ9.D4qlEBSDgx8qRSvIJ6jwUUi2HLyR45NAfb-IGAKU3OM',
        expires: '2022-06-20T14:12:31.152Z',
      },
      refresh: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MmFmMmVjZWRiNzAyYzI3ODJiNTdjNWIiLCJpYXQiOjE2NTU2NDc5NTEsImV4cCI6MTY1ODIzOTk1MSwidHlwZSI6InJlZnJlc2gifQ.Zb_o97Y3NFCDzVGs8TPZEdnmDKJGfE1CLltYHh7T1U8',
        expires: '2022-07-19T14:12:31.152Z',
      },
    },
    user: {
      username: 'Pelusa',
      email: 'pelusa@gmail.com',
    },
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

export const register = {
  '/user/register': {
    post: {
      tags: ['Users'],
      summary: 'Register a new user',
      description: 'Create new user in system',
      consumes: ['application/json'],
      produces: ['application/json'],
      requestBody: registerUserRequestBody,
      responses: {
        [StatusCodes.CREATED]: successResponse,
        [StatusCodes.BAD_REQUEST]: validationErrorResponse,
      },
    },
  },
};
