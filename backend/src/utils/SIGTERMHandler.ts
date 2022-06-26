import { Logger, LoggerToFile } from '@config/logger';
import { exitHandler } from './exitHandler';
import { server } from '../http-server';

export const SIGTERMHandler = () => {
  Logger.info('SIGTERM received');

  LoggerToFile.info('SIGTERM received');

  exitHandler(server);
};
