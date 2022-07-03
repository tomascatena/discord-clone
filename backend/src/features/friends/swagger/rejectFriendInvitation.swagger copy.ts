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
  description: 'Invitation rejected',
  responseBody: {
    message: 'Successfully rejected invitation from 62bdf1713aa9c4a7346288e9',
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

const notAuthorizedToRejectInvitation = getSwaggerResponseBodySchema({
  description: 'Not authorized to reject invitation',
  responseBody: {
    statusCode: 401,
    message: 'You are not authorized to reject this invitation',
  },
});

const invitationNotFound = getSwaggerResponseBodySchema({
  description: 'Invitation not found',
  responseBody: {
    statusCode: 404,
    message: 'Invitation not found',
  },
});

export const rejectFriendInvitation = {
  '/friends/invitation/reject': {
    post: {
      tags: ['Friends'],
      summary: 'Accept friend invitation',
      description:
        'Removes the invitation from the database and add the user to the friend list',
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
        [StatusCodes.BAD_REQUEST]: validationError,
        [StatusCodes.UNAUTHORIZED]: notAuthorizedToRejectInvitation,
        [StatusCodes.NOT_FOUND]: invitationNotFound,
      },
    },
  },
};
