import { Logger } from '@config/logger';
import { SIGMTERMHandler } from '@utils/SIGNTERMHandler';
import { app } from './app';
import { connectDB } from '@config/connectDB';
import { env } from '@config/config';
import { uncaughtException } from '@utils/uncaughtExceptionHandler';
import { unhandledRejectionHandler } from '@utils/unhandledRejectionHandler';
import http from 'http';

export const server = http.createServer(app);

server.listen(env.PORT, () => {
  Logger.info(`Server listening on port ${env.PORT}`);

  connectDB();
});

process.on('unhandledRejection', unhandledRejectionHandler);

process.on('uncaughtException', uncaughtException);

process.on('SIGTERM', SIGMTERMHandler);
