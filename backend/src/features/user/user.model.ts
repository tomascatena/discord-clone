import { env } from '@/config/config';
import bcryptjs from 'bcryptjs';
import mongoose, { Model } from 'mongoose';

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  friends: string[];
  isPasswordMatch: (password: string) => Promise<boolean>;
}

interface IUserModel extends Model<IUser> {
  isEmailTaken: (
    email: string,
    excludeUserId?: string | undefined
  ) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser, IUserModel>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: env.PASSWORD_MIN_LENGTH,
      maxlength: env.PASSWORD_MAX_LENGTH,
    },
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId: string | undefined = undefined
): Promise<boolean> {
  const user = await this.findOne({
    email: email.toLowerCase(),
    _id: { $ne: excludeUserId },
  });

  return Boolean(user);
};

userSchema.methods.isPasswordMatch = async function (password: string) {
  return bcryptjs.compare(password, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcryptjs.genSalt(12);

  this.password = await bcryptjs.hash(this.password, salt);
});

const User: IUserModel = mongoose.model<IUser, IUserModel>('User', userSchema);

export default User;
