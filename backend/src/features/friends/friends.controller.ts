import { ApiError } from '@utils/ApiError';
import { RequestWithBody } from '../../typings/typings';
import { Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import httpStatus from 'http-status-codes';
import userService from '@user/user.service';

/**
 * @route    POST api/v1/friends/sendInvitation
 * @desc     Send invitation to friend
 * @access   Private
 */
const sendInvitation = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const { email } = req.body; // Email of the user to invite
    const { userId } = req; // User id of the user sending the invitation

    const user = await userService.getUserById(userId);

    const targetUser = await userService.getUserByEmail(email!);

    if (!user) {
      throw new ApiError({
        statusCode: httpStatus.NOT_FOUND,
        message: 'User not found',
        isOperational: false,
      });
    }

    if (!targetUser) {
      throw new ApiError({
        statusCode: httpStatus.NOT_FOUND,
        message: `User with email "${email}" not found`,
        isOperational: false,
      });
    }

    if (user.email === email) {
      throw new ApiError({
        statusCode: httpStatus.BAD_REQUEST,
        message: 'You cannot invite yourself',
        isOperational: false,
      });
    }

    return res.status(httpStatus.CREATED).json({
      message: 'Successfully sent invitation',
    });
  }
);

export default {
  sendInvitation,
};
