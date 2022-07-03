import { StatusCodes } from 'http-status-codes';
import {
  getSwaggerRequestBodySchema,
  getSwaggerResponseBodySchema,
} from '@/utils/swagger/getSwaggerSchema';

const registerUserRequestBody = getSwaggerRequestBodySchema({
  isRequired: true,
  requiredFields: ['invitationId'],
  requestBody: {
    invitationId: '62c035f417171e636cabfa0e',
  },
});

const successResponse = getSwaggerResponseBodySchema({
  description: 'Invitation accepted',
  responseBody: {
    message: 'Successfully accepted invitation from rufo',
  },
});

const validationError = getSwaggerResponseBodySchema({
  description: 'Invalid request body',
  responseBody: {
    validatorErrors: [
      {
        message: '"invitationId" is required',
        path: ['invitationId'],
        type: 'any.required',
        context: {
          label: 'invitationId',
          key: 'invitationId',
        },
      },
    ],
  },
});

const notAuthorizedToAcceptInvitation = getSwaggerResponseBodySchema({
  description: 'Not authorized to accept invitation',
  responseBody: {
    statusCode: 401,
    message: 'You are not authorized to accept this invitation',
  },
});

const invitationNotFound = getSwaggerResponseBodySchema({
  description: 'Invitation not found',
  responseBody: {
    statusCode: 404,
    message: 'Invitation not found',
  },
});

export const acceptFriendInvitation = {
  '/friends/invitation/accept': {
    post: {
      tags: ['Friends'],
      summary: 'Accept friend invitation',
      description:
        'Removes the invitation from the database and add the user to the friend list',
      consumes: ['application/json'],
      produces: ['application/json'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: registerUserRequestBody,
      responses: {
        [StatusCodes.OK]: successResponse,
        [StatusCodes.BAD_REQUEST]: validationError,
        [StatusCodes.UNAUTHORIZED]: notAuthorizedToAcceptInvitation,
        [StatusCodes.NOT_FOUND]: invitationNotFound,
      },
    },
  },
};
