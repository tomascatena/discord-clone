import FriendInvitation from '@/features/friends/friendInvitation.model';
// import User from '@/features/user/user.model';
import serverStore from '@/serverStore';

const updateFriendsPendingInvitations = async (userId: string) => {
  try {
    const pendingInvitations = await FriendInvitation.find({
      receiverId: userId,
    }).populate('senderId', '_id username email');

    // Get all active connections of the user
    const activeConnections = serverStore.getOnlineUsers(userId);

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

export default {
  updateFriendsPendingInvitations,
};
