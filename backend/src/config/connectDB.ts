import { Logger, LoggerToFile } from './logger';
import { env } from './config';
import mongoose from 'mongoose';

const logError = (err: Error | mongoose.Error) => {
  Logger.error(
    `Something went wrong when connecting to mongoDB: ${err.message}`
  );

  LoggerToFile.error({
    name: err.name,
    message: err.message,
    stack: err.stack,
  });
};

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    Logger.info(`MongoDB connected`);
  } catch (error) {
    if (error instanceof Error || error instanceof mongoose.Error) {
      logError(error);
      process.exit(1);
    }
  }
};
