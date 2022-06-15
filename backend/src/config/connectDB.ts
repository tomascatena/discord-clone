import { env } from './config';
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);

    console.log(`MongoDB connected`);
  } catch (error) {
    if (error instanceof Error || error instanceof mongoose.Error) {
      console.log(
        `Something went wrong when connecting to mongoDB: ${error.message}`
      );

      process.exit(1);
    }
  }
};
