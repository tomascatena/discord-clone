import { RequestWithBody } from '../typings/typings';
import { Response } from 'express';
import { catchAsync } from 'utils/catchAsync';
import httpStatus from 'http-status-codes';
import userService from './user.service';

/**
 * @route    POST api/v1/auth/register
 * @desc     Register new user
 * @access   Public
 */
export const registerUser = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const { username, email, password } = req.body;

    const user = await userService.createUser({
      username,
      email,
      password,
    });

    return res.status(httpStatus.CREATED).json({
      message: 'New user successfully registered',
      user: {
        username: user?.username,
        email: user?.email,
      },
    });
  }
);
