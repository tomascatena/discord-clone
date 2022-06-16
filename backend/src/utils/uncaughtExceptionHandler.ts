import { Logger, LoggerToFile } from '@config/logger';
import { env } from '@config/config';
import { exitHandler } from './exitHandler';
import { server } from '../server';

export const uncaughtExceptionHandler = (
  err: Error,
  origin: NodeJS.UncaughtExceptionOrigin
) => {
  const errorToLog = {
    message: 'Uncaught Exception thrown',
    error: {
      message: err.message,
      name: err.name,
      stack: err.stack,
    },
    origin,
  };

  LoggerToFile.error(errorToLog);

  if (env.NODE_ENV === 'development') {
    Logger.error(err);
  }

  exitHandler(server);
};
