import { connectDB } from '@config/connectDB';
import { env } from '@config/config';
import { errorHandler, transformErrorToAPIError } from '@middleware/error';
import { expressWinstonLogger } from './config/logger';
import { morganHttpLogger } from '@config/morgan';
import { notFound } from '@middleware/notFound';
import { validatorResponseMessage } from '@middleware/validatorResponseMessage';
import cors from 'cors';
import express from 'express';
import http from 'http';
import routes from '@routes/v1';

const app = express();

if (env.NODE_ENV === 'development') {
  // HTTP request logger middleware
  app.use(morganHttpLogger);
}

// Parse json request body
app.use(express.json({ limit: '1kb' }));

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: '1kb' }));

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

const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);

  connectDB();
});
