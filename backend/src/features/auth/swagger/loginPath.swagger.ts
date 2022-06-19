import { StatusCodes } from 'http-status-codes';

const loginUserRequestBody = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            example: 'john@email.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
        },
      },
    },
  },
};

const loginUserSuccessResponse = {
  description: 'Login existing user',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Login successful',
          },
          user: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                example: 'john@email.com',
              },
            },
          },
        },
      },
    },
  },
};

const getMeSuccessResponse = {
  description: 'Get logged in user',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Login successful',
          },
          user: {
            type: 'object',
            properties: {
              username: {
                type: 'string',
                example: 'John Doe',
              },
              email: {
                type: 'string',
                example: 'john@email.com',
              },
              _id: {
                type: 'string',
                example: '62ab161ce8c4f0e428adeaed',
              },
            },
          },
        },
      },
    },
  },
};

const loginUserErrorResponse = {
  description: 'Invalid email or password',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Incorrect email or password',
          },
          statusCode: {
            type: 'number',
            example: StatusCodes.UNAUTHORIZED,
          },
        },
      },
    },
  },
};

const tokenExpiredErrorResponse = {
  description: 'Expired token',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          statusCode: {
            type: 'number',
            example: StatusCodes.UNAUTHORIZED,
          },
        },
      },
    },
  },
};

const validationError = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      example: '"email" must be a valid email',
    },
    path: {
      type: 'array',
      items: {
        type: 'string',
        example: 'email',
      },
    },
    type: {
      type: 'string',
      example: 'string.email',
    },
    context: {
      type: 'object',
      properties: {
        invalids: {
          type: 'array',
          items: {
            type: 'string',
            example: 'johngmail.com',
          },
        },
        label: {
          type: 'string',
          example: 'email',
        },
        key: {
          type: 'string',
          example: 'email',
        },
      },
    },
  },
};

const loginUserValidationErrorResponse = {
  description: 'Validation error on email or password',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          validationErrors: {
            type: 'array',
            items: validationError,
          },
        },
      },
    },
  },
};

export const login = {
  '/auth/login': {
    post: {
      tags: ['Auth'],
      summary: 'Login user',
      description: 'Logs in existing user',
      consumes: ['application/json'],
      produces: ['application/json'],
      security: [
        {
          bearerAuth: [],
        },
      ],
      requestBody: loginUserRequestBody,
      responses: {
        [StatusCodes.OK]: loginUserSuccessResponse,
        [StatusCodes.UNAUTHORIZED]: loginUserErrorResponse,
        [StatusCodes.BAD_REQUEST]: loginUserValidationErrorResponse,
      },
    },
  },
};

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
