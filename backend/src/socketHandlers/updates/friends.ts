import { ObjectId } from 'mongoose';
import FriendInvitation from '@/features/friends/friendInvitation.model';
import User from '@/features/user/user.model';
import serverStore from '@/serverStore';

/**
 * @desc Emit friends-invitations to all the active connections of the user that should receive the invitation
 */
const updateFriendsPendingInvitations = async (userId: string) => {
  try {
    // Get all active connections of the user
    const activeConnections = serverStore.getOnlineUsers(userId);

    if (activeConnections.length === 0) {
      return;
    }

    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username email');

    const io = serverStore.getSocketServerInstance();

    // Send the pending invitations to the user's active connections
    activeConnections.forEach((socketId) => {
      io.to(socketId).emit('friends-invitations', {
        pendingInvitations,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

type PopulatedUser = {
  _id: ObjectId;
  username: string;
  email: string;
  friends: Array<{
    _id: ObjectId;
    username: string;
    email: string;
  }>;
};

/**
 * @desc Emit the friends list to the user's active connections
 * @param userId The id of the user to get the friends list
 */
const sendFriendsList = async (userId: string) => {
  try {
    // Get all active connections of the user
    const activeConnections = serverStore.getOnlineUsers(userId);

    if (activeConnections.length === 0) {
      return;
    }

    const user = (await User.findById(userId, {
      _id: 1,
      friends: 1,
    }).populate('friends', '_id username email')) as PopulatedUser;

    if (!user) {
      return;
    }

    const io = serverStore.getSocketServerInstance();

    console.log(`Sending friends list to user with id: ${userId}`);

    // Send the pending invitations to the user's active connections
    activeConnections.forEach((socketId) => {
      io.to(socketId).emit('friends-list', {
        friends: user.friends,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  updateFriendsPendingInvitations,
  sendFriendsList,
};
