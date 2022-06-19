import { bearerAuth } from './securitySchemes.swagger';
import { env } from '@config/config';
import authPaths from '@auth/swagger/auth.swagger.paths';
import express from 'express';
import swaggerDefinition from './swaggerDef';
import swaggerUi from 'swagger-ui-express';
import userPaths from '@user/swagger/user.swagger.paths';

const router = express.Router();

const swaggerDocumentation: swaggerUi.JsonObject = {
  ...swaggerDefinition,
  paths: {
    ...userPaths,
    ...authPaths,
  },
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth,
    },
  },
};

const supportedSubmitMethods =
  env.NODE_ENV === 'development' ? ['get', 'put', 'post', 'delete'] : [''];

const options: swaggerUi.SwaggerOptions = {
  swaggerOptions: {
    explorer: true,
    tryItOutEnabled: env.NODE_ENV === 'development',
    supportedSubmitMethods,
  },
};

router.use('/', swaggerUi.serve);

router.get('/', swaggerUi.setup(swaggerDocumentation, options));

export default router;
