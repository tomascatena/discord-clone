import { ApiError } from '@/utils/ApiError';
import httpStatus from 'http-status-codes';
import userService from '@/features/user/user.service';

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await userService.getUserByEmail(email);

  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError({
      statusCode: httpStatus.UNAUTHORIZED,
      message: 'Incorrect email or password',
      isOperational: false,
    });
  }

  return user;
};

export default {
  loginWithEmailAndPassword,
};
