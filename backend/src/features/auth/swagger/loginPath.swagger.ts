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

const loginUserValidationErrorResponse = {
  description: 'Validation error on email or password',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          validationErrors: {
            type: 'array',
            items: {
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
            },
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
