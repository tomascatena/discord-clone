import { RequestWithBody } from '../typings/typings';
import { Response } from 'express';
import { catchAsync } from 'utils/catchAsync';
import httpStatus from 'http-status-codes';

/**
 * @route    POST api/v1/auth/login
 * @desc     Authenticate user & get token
 * @access   Private
 */
export const loginUser = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const { email, password } = req.body;

    console.log(email, password);

    res.status(httpStatus.OK).json({
      message: 'Successfully logged in',
    });
  }
);
