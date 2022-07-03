import { bearerAuth } from './securitySchemes.swagger';
import { env } from '@/config/config';
import authPaths from '@/features/auth/swagger/auth.swagger.paths';
import express from 'express';
import friendsPaths from '@/features/friends/swagger/friends.swagger.paths';
import swaggerDefinition from './swaggerDef';
import swaggerUi from 'swagger-ui-express';
import userPaths from '@/features/user/swagger/user.swagger.paths';

const router = express.Router();

const swaggerDocumentation: swaggerUi.JsonObject = {
  ...swaggerDefinition,
  paths: {
    ...userPaths,
    ...authPaths,
    ...friendsPaths,
  },
  components: {
    schemas: {},
    securitySchemes: {
      bearerAuth,
    },
  },
};

const supportedSubmitMethods =
  env.NODE_ENV === 'development'
    ? ['get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace']
    : [''];

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
