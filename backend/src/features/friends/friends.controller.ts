import { RequestWithBody } from '../../typings/typings';
import { Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import httpStatus from 'http-status-codes';

/**
 * @route    POST api/v1/friends/sendInvitation
 * @desc     Register new user
 * @access   Private
 */
const sendInvitation = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    return res.status(httpStatus.CREATED).json({
      message: 'Successfully sent invitation',
    });
  }
);

export default {
  sendInvitation,
};
