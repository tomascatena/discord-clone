import { env } from '@config/config';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: env.PASSWORD_MIN_LENGTH,
      maxlength: env.PASSWORD_MAX_LENGTH,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('User', userSchema);
