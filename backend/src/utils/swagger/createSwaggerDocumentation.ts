import { env } from '@/config/config';
import { getSwaggerRequestBodySchema } from '@/utils/swagger/getSwaggerSchema';
import { getSwaggerResponseBodySchema } from './getSwaggerSchema';

const { version } = require('../../../package.json');

type GeneralObject = {
  [key: string]: any;
};

type Tag = { name: string; description?: string };

const getTags = (tags: Tag[], tagName: string, description: string) => {
  const tagToAdd = description
    ? { name: tagName, description }
    : { name: tagName };
  return [...tags, tagToAdd];
};

const populateResponses = (
  subItemResponse: GeneralObject,
  responses: GeneralObject
) => {
  subItemResponse.forEach((response: GeneralObject) => {
    responses[response.code] = getSwaggerResponseBodySchema({
      description: response.name,
      responseBody: response.body ? JSON.parse(response.body) : null,
    });
  });
};

const getRequestBody = (subItem: GeneralObject) => {
  return getSwaggerRequestBodySchema({
    isRequired: true,
    requiredFields: subItem.request.body
      ? Object.keys(JSON.parse(subItem.request.body.raw))
      : [],
    requestBody: subItem.request.body
      ? JSON.parse(subItem.request.body.raw)
      : null,
  });
};

const getPathObject = ({
  subItem,
  tagName,
  requestBody,
  responses,
}: {
  subItem: GeneralObject;
  tagName: string;
  requestBody: GeneralObject;
  responses: GeneralObject;
}) => ({
  [subItem.request.method.toLowerCase()]: {
    tags: [tagName],
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
});

export const createSwaggerDocumentation = (
  postmanCollection: GeneralObject
) => {
  const paths: GeneralObject = {};
  let tags: Tag[] = [];

  postmanCollection.item.forEach((folder: GeneralObject) => {
    const tagName = folder.name;
    const responses: GeneralObject = {};

    tags = getTags(tags, tagName, folder.description);

    folder.item.forEach((subItem: GeneralObject) => {
      populateResponses(subItem.response, responses);

      const requestBody = getRequestBody(subItem);

      const pathUrl = subItem.request.url.path
        .join('/')
        .replace('api/v1/', '/');

      paths[pathUrl] = getPathObject({
        subItem,
        tagName,
        requestBody,
        responses,
      });
    });
  });

  const docs = {
    openapi: '3.0.0',
    info: {
      title: 'Discord Clone Backend',
      version,
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
    host: `localhost:${env.PORT}`,
    basePath: '/api/v1',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    servers: [
      {
        url: `http://localhost:${env.PORT}/api/v1`,
        description: 'API V1',
      },
    ],
    tags,
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
