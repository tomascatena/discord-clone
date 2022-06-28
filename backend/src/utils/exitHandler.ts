import { Logger } from '@/config/logger';
import { Server } from 'http';

export const exitHandler = (server: Server) => {
  if (server) {
    server.close(() => {
      Logger.info('Server closed');

      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
