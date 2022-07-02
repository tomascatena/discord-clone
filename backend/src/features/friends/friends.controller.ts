import { ApiError } from '@/utils/ApiError';
import { RequestWithBody } from '../../typings/typings';
import { Response } from 'express';
import { catchAsync } from '@/utils/catchAsync';
import friendsHandler from '@/socketHandlers/updates/friends';
import friendsService from './friends.service';
import httpStatus from 'http-status-codes';
import userService from '@/features/user/user.service';

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

    const targetUserId = targetUser._id.toString();

    // Check if the invitation has already been sent
    const existingInvitation = await friendsService.getInvitation({
      senderId: userId,
      receiverId: targetUserId,
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
      userId: targetUserId,
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
      receiverId: targetUserId,
    });

    friendsHandler.updateFriendsPendingInvitations(targetUserId);

    return res.status(httpStatus.CREATED).json({
      message: `Successfully sent invitation to ${targetUser.email}`,
    });
  }
);

/**
 * @route POST api/v1/friends/invitation/accept
 * @desc Accept friend invitation request from user
 * @access Private
 */
const acceptInvitation = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const { userId } = req; // User id of the user accepting the invitation
    const invitationId = req.body.invitationId!; // Invitation id of the invitation to accept

    const invitation = await friendsService.getInvitationById(invitationId);

    console.log(userId);
    console.log(invitation);

    if (!invitation) {
      throw new ApiError({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Invitation not found',
        isOperational: false,
      });
    }

    if (invitation.receiverId._id.toString() !== userId) {
      throw new ApiError({
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You are not authorized to accept this invitation',
        isOperational: false,
      });
    }

    await friendsService.acceptInvitation({
      invitationId,
      senderId: invitation.senderId._id.toString(),
      receiverId: invitation.receiverId._id.toString(),
    });

    // Update list of friends if the users are online
    friendsHandler.sendFriendsList(userId);
    friendsHandler.sendFriendsList(invitation.senderId._id.toString());

    friendsHandler.updateFriendsPendingInvitations(userId);

    return res.status(httpStatus.OK).json({
      message: `Successfully accepted invitation from ${invitation.senderId.username}`,
    });
  }
);

/**
 * @route POST api/v1/friends/invitation/reject
 * @desc Reject friend invitation request from user
 * @access Private
 */
const rejectInvitation = catchAsync(
  async (req: RequestWithBody, res: Response) => {
    const { userId } = req; // User id of the user accepting the invitation
    const invitationId = req.body.invitationId!; // Invitation id of the invitation to reject

    const invitation = await friendsService.getInvitationById(invitationId);

    if (!invitation) {
      throw new ApiError({
        statusCode: httpStatus.NOT_FOUND,
        message: 'Invitation not found',
        isOperational: false,
      });
    }

    if (invitation.receiverId._id.toString() !== userId) {
      throw new ApiError({
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You are not authorized to reject this invitation',
        isOperational: false,
      });
    }

    await friendsService.rejectInvitation(invitationId);

    friendsHandler.updateFriendsPendingInvitations(userId);

    return res.status(httpStatus.OK).json({
      message: `Successfully rejected invitation from ${invitation.senderId.username}`,
    });
  }
);

export default {
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
};
