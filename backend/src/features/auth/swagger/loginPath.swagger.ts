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
        '200': loginUserSuccessResponse,
      },
    },
  },
};
