import { ApiError } from '@utils/ApiError';
import User, { IUser } from './user.model';
import httpStatus from 'http-status-codes';

const getUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });

  return user;
};

const getUserById = async (userId: string) => {
  const user = await User.findById(userId).select('-password');

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

const isFriend = async ({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) => {
  const user = await getUserById(userId);

  const friend = user!.friends.find((f) => f.toString() === friendId);

  return Boolean(friend);
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
  isFriend,
};
