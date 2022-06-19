import { getSwaggerRequestBodySchema } from '@utils/swagger/getSwaggerResponseBodySchema';
import { getSwaggerResponseBodySchema } from './getSwaggerResponseBodySchema';

export const createSwaggerDocumentation = (postmanCollection: any) => {
  const paths: any = {};

  postmanCollection.item.forEach((item: any) => {
    const tagName = item.name;
    const responses: any = {};

    const tags = [tagName];

    item.item.forEach((subItem: any) => {
      subItem.response.forEach((response: any) => {
        responses[response.code] = getSwaggerResponseBodySchema({
          description: response.name,
          responseBody: response.body ? JSON.parse(response.body) : null,
        });
      });

      const requestBody = getSwaggerRequestBodySchema({
        isRequired: true,
        requiredFields: subItem.request.body
          ? Object.keys(JSON.parse(subItem.request.body.raw))
          : [],
        requestBody: subItem.request.body
          ? JSON.parse(subItem.request.body.raw)
          : null,
      });

      const pathUrl = subItem.request.url.path
        .join('/')
        .replace('api/v1/', '/');

      paths[pathUrl] = {
        [subItem.request.method.toLowerCase()]: {
          tags,
          summary: subItem.name,
          ...(subItem.request.description && {
            description: subItem.request.description,
          }),
          ...(subItem.description && { description: subItem.description }),
          consumes: ['application/json'],
          produces: ['application/json'],
          ...(subItem.request.auth?.type === 'bearer' && {
            security: [
              {
                bearerAuth: [],
              },
            ],
          }),
          ...(subItem.request.body && { requestBody }),
          responses,
        },
      };
    });
  });

  const docs = {
    openapi: '3.0.0',
    info: {
      title: 'Discord Clone Backend',
      version: '1.0.0',
      description:
        'This is a simple CRUD API application made with Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Tomás Catena',
        url: 'https://www.tomascatena.com',
        email: 'tomascatena@gmail.com',
      },
    },
    host: 'localhost:5000',
    basePath: '/api/v1',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
    paths,
    components: {
      schemas: {},
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          in: 'header',
          description:
            'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"',
        },
      },
    },
  };

  return docs;
};
