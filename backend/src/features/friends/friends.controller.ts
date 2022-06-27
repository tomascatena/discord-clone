import { ApiError } from '@utils/ApiError';
import { RequestWithBody } from '../../typings/typings';
import { Response } from 'express';
import { catchAsync } from '@utils/catchAsync';
import friendsService from './friends.service';
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

    // Check if the invitation has already been sent
    const existingInvitation = await friendsService.getInvitation({
      senderId: userId,
      receiverId: targetUser._id,
    });

    if (existingInvitation) {
      throw new ApiError({
        statusCode: httpStatus.CONFLICT,
        message:
          'Invitation already sent, please wait for the user to accept it',
        isOperational: false,
      });
    }

    // Check if the user is already a friend of the target user
    const isFriend = await userService.isFriend({
      userId: targetUser._id,
      friendId: userId,
    });

    if (isFriend) {
      throw new ApiError({
        statusCode: httpStatus.CONFLICT,
        message: `You are already friends with ${targetUser.username}`,
        isOperational: false,
      });
    }

    await friendsService.createInvitation({
      senderId: userId,
      receiverId: targetUser._id,
    });

    return res.status(httpStatus.CREATED).json({
      message: `Successfully sent invitation to ${targetUser.email}`,
    });
  }
);

export default {
  sendInvitation,
};
