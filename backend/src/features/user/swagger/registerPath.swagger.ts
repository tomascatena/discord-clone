const registerUserRequestBody = {
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['username', 'email', 'password', 'confirmPassword'],
        properties: {
          username: {
            type: 'string',
            example: 'John Doe',
          },
          email: {
            type: 'string',
            example: 'john@email.com',
          },
          password: {
            type: 'string',
            example: '123456',
          },
          confirmPassword: {
            type: 'string',
            example: '123456',
          },
        },
      },
    },
  },
};

const registerUserSuccessResponse = {
  description: 'New user is created',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: 'User successfully created',
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
        '201': registerUserSuccessResponse,
      },
    },
  },
};
