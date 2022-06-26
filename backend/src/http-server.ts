import { Logger } from '@config/logger';
import { SIGTERMHandler } from '@utils/SIGTERMHandler';
import { app } from './app';
import { connectDB } from '@config/connectDB';
import { env } from '@config/config';
import { registerSocketServer } from './socket-server';
import { uncaughtExceptionHandler } from '@utils/uncaughtExceptionHandler';
import { unhandledRejectionHandler } from '@utils/unhandledRejectionHandler';
import http from 'http';

export const server = http.createServer(app);

server.listen(env.PORT, () => {
  Logger.info(`HTTP Server listening on port ${env.PORT}`);

  if (env.NODE_ENV !== 'test') {
    connectDB();
  }

  registerSocketServer(server);
});

process.on('unhandledRejection', unhandledRejectionHandler);

process.on('uncaughtException', uncaughtExceptionHandler);

process.on('SIGTERM', SIGTERMHandler);
