import { ApiError } from '@/utils/ApiError';
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

/**
 * @desc Check if the user with id friendId is included in the friends array of the user with id userId
 */
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

const addFriendToUser = async ({
  userId,
  friendId,
}: {
  userId: string;
  friendId: string;
}) => {
  const user = await getUserById(userId);

  if (!user) {
    throw new ApiError({
      statusCode: httpStatus.NOT_FOUND,
      message: 'User not found',
      isOperational: false,
    });
  }

  if (userId === friendId) {
    throw new ApiError({
      statusCode: httpStatus.BAD_REQUEST,
      message: 'You cannot add yourself as a friend',
      isOperational: false,
    });
  }

  if (await isFriend({ userId, friendId })) {
    throw new ApiError({
      statusCode: httpStatus.CONFLICT,
      message: 'You are already friends with this user',
      isOperational: false,
    });
  }

  user.friends.push(friendId);

  await user.save();

  return user;
};

export default {
  createUser,
  getUserById,
  getUserByEmail,
  isFriend,
  addFriendToUser,
};
