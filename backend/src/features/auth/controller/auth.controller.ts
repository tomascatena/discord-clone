import { RequestWithBody } from '../../../typings/typings';
import { Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import authService from '../service/auth.service';
import httpStatus from 'http-status-codes';
import tokenService from '@token/token.service';
import userService from '@user/user.service';

/**
 * @route    POST api/v1/auth/login
 * @desc     Authenticate user & get token
 * @access   Private
 */
const loginUser = catchAsync(async (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body;

  const user = await authService.loginWithEmailAndPassword(email!, password!);

  const tokens = await tokenService.generateAuthTokens(user._id);

  res.status(httpStatus.OK).json({
    message: 'Successfully logged in',
    tokens,
    user: {
      username: user?.username,
      _id: user?._id,
    },
  });
});

/**
 * @route    GET api/v1/auth
 * @desc     Get auth user
 * @access   Private
 */
const getUser = catchAsync(async (req: RequestWithBody, res: Response) => {
  const user = await userService.getUserById(req.userId!);

  return res.status(httpStatus.OK).json({
    message: 'Successfully authenticated user',
    user: {
      username: user?.username,
      email: user?.email,
      _id: user?._id,
    },
  });
});

export default {
  loginUser,
  getUser,
};
