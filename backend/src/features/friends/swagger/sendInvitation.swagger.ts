import { StatusCodes } from 'http-status-codes';
import {
  getSwaggerRequestBodySchema,
  getSwaggerResponseBodySchema,
} from '@/utils/swagger/getSwaggerSchema';

const registerUserRequestBody = getSwaggerRequestBodySchema({
  isRequired: true,
  requiredFields: ['email'],
  requestBody: {
    email: 'pelusa@gmail.com',
  },
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'Invitation sent',
  responseBody: {
    message: 'Successfully sent invitation to rufo@gmail.com',
  },
});

const invitationAlreadySent = getSwaggerResponseBodySchema({
  description: 'Invitation was already sent',
  responseBody: {
    statusCode: 409,
    message: 'Invitation already sent, please wait for the user to accept it',
  },
});

const userNotFound = getSwaggerResponseBodySchema({
  description: 'User not found',
  responseBody: {
    statusCode: 404,
    message: 'User with email "user@email.com" not found',
  },
});

const tokenExpired = getSwaggerResponseBodySchema({
  description: 'Token expired',
  responseBody: {
    statusCode: 401,
    message: 'Unauthorized',
  },
});

export const sendInvitation = {
  '/friends/sendInvitation': {
    post: {
      tags: ['Friends'],
      summary: 'Send friend invitation to other user',
      description:
        'Create a new friend invitation in the database and send it to the other user',
      consumes: ['application/json'],
      produces: ['application/json'],
      requestBody: registerUserRequestBody,
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        [StatusCodes.OK]: successResponse,
        [StatusCodes.CONFLICT]: invitationAlreadySent,
        [StatusCodes.NOT_FOUND]: userNotFound,
        [StatusCodes.UNAUTHORIZED]: tokenExpired,
      },
    },
  },
};
