import { env } from '@config/config';

const { version } = require('../../../package.json');

const swaggerDef = {
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
    },
  ],
};

export default swaggerDef;
