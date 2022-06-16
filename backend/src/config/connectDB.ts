import { Logger, LoggerToFile } from './logger';
import { env } from './config';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    Logger.info(`MongoDB connected`);
  } catch (error) {
    if (error instanceof Error || error instanceof mongoose.Error) {
      Logger.error(
        `Something went wrong when connecting to mongoDB: ${error.message}`
      );

      LoggerToFile.error({
        name: error.name,
        message: error.message,
        stack: error.stack,
      });

      process.exit(1);
    }
  }
};
