import { ApiError } from '@utils/ApiError';
import User, { IUser } from './user.model';
import httpStatus from 'http-status-codes';

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
};
