import { RequestWithBody } from '../../typings/typings';
import { Response } from 'express';
import { catchAsync } from '@/utils/catchAsync';
import httpStatus from 'http-status-codes';
import tokenService from '@/features/token/token.service';
import userService from './user.service';

/**
 * @route    POST api/v1/auth/register
 * @desc     Register new user
 * @access   Public
 */
const registerUser = catchAsync(async (req: RequestWithBody, res: Response) => {
  const { username, email, password } = req.body;

  const user = await userService.createUser({
    username,
    email,
    password,
  });

  const tokens = await tokenService.generateAuthTokens(user._id);

  return res.status(httpStatus.CREATED).json({
    message: 'New user successfully registered',
    tokens,
    user: {
      username: user?.username,
      email: user?.email,
      _id: user?._id,
    },
  });
});

export default {
  registerUser,
};
