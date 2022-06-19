import { createSwaggerDocumentation } from '../../utils/swagger/createSwaggerDocumentation';
import { env } from '@config/config';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

// import fs from 'fs';
// import path from 'path';
import postmanCollection from './postmanCollection.json';

const router = express.Router();

const supportedSubmitMethods =
  env.NODE_ENV === 'development' ? ['get', 'put', 'post', 'delete'] : [''];

const options: swaggerUi.SwaggerOptions = {
  swaggerOptions: {
    explorer: true,
    tryItOutEnabled: env.NODE_ENV === 'development',
    supportedSubmitMethods,
  },
};

// fs.writeFileSync(
//   path.resolve(__dirname, 'swaggerDocumentation.json'),
//   JSON.stringify(createSwaggerDocumentation(postmanCollection), null, 2)
// );

router.use('/', swaggerUi.serve);

router.get(
  '/',
  swaggerUi.setup(createSwaggerDocumentation(postmanCollection), options)
);

export default router;
