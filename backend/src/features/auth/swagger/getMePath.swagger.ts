import { StatusCodes } from 'http-status-codes';
import { getSwaggerResponseBodySchema } from '@utils/swagger/getSwaggerResponseBodySchema';

const getMeSuccessResponse = getSwaggerResponseBodySchema({
  description: 'Get logged in user',
  responseBody: {
    message: 'Successfully authenticated user',
    user: {
      username: 'Pelusa',
      email: 'pelusa@gmail.com',
      _id: '62ab161ce8c4f0e428adeaed',
    },
  },
});

const tokenExpiredErrorResponse = getSwaggerResponseBodySchema({
  description: 'Expired token',
  responseBody: {
    message: 'Unauthorized',
    statusCode: StatusCodes.UNAUTHORIZED,
  },
});

export const getMe = {
  '/auth/me': {
    get: {
      tags: ['Auth'],
      summary: 'Get logged in user',
      description: 'Gets information about the currently logged in user',
      consumes: ['application/json'],
      produces: ['application/json'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      responses: {
        [StatusCodes.OK]: getMeSuccessResponse,
        [StatusCodes.UNAUTHORIZED]: tokenExpiredErrorResponse,
      },
    },
  },
};
