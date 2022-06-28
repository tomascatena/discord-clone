import { env } from '@/config/config';
import { errorHandler, transformErrorToAPIError } from '@/middleware/error';
import { expressWinstonLogger } from './config/logger';
import { morganHttpLogger } from '@/config/morgan';
import { notFound } from '@/middleware/notFound';
import { validatorResponseMessage } from '@/middleware/validatorResponseMessage';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import routes from '@/routes/v1';
// @ts-ignore
import xssClean from 'xss-clean';

export const app = express();

// Secure Express app by setting various HTTP headers
app.use(helmet());

// Prevent cross site scripting attacks
app.use(xssClean());

// Sanitize request data
app.use(mongoSanitize());

if (env.NODE_ENV === 'development') {
  // HTTP request logger middleware
  app.use(morganHttpLogger);
}

// Parse json request body
app.use(express.json({ limit: '1kb' }));

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

// Protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Enable cors
app.use(cors());
// Enable pre-flight
app.options('*', cors);

// Express-winston logger makes sense BEFORE the router
app.use(expressWinstonLogger.info);

// v1 api routes
app.use('/api/v1', routes);

// Express-winston errorLogger makes sense AFTER the router
app.use(expressWinstonLogger.error);

// parse validation errors and send formatted response
app.use(validatorResponseMessage);

// Fallback for not found requests
app.use(notFound);

// Convert error to ApiError, if needed
app.use(transformErrorToAPIError);

// Error handler for failed requests
app.use(errorHandler);
