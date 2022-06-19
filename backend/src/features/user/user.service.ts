import { ApiError } from '@utils/ApiError';
import User, { IUser } from './user.model';
import httpStatus from 'http-status-codes';

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'User does not exists',
      isOperational: false,
    });
  }

  return user;
};

const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'User does not exists',
      isOperational: false,
    });
  }

  return user;
};

const createUser = async (userBody: Partial<IUser>) => {
  if (await User.isEmailTaken(userBody.email!)) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'Email already taken',
      isOperational: false,
    });
  }

  const user = await User.create(userBody);

  return user;
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
};
