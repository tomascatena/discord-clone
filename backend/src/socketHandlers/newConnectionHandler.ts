import { Server, Socket } from 'socket.io';
import friends from './updates/friends';
import serverStore from '../serverStore';

/**
 * @desc Handle the connection of a new user to the socket server. Will add the new user to the connected users Map (in-memory store).
 * @param socket - socket object
 * @param io - socket.io server
 */
// eslint-disable-next-line
export const newConnectionHandler = async (socket: Socket, io: Server) => {
  const userDetails = await socket.data.user;

  if (!userDetails) {
    return;
  }

  const userId = userDetails._id.toString();

  serverStore.addNewConnectedUser({
    userId,
    socketId: socket.id,
  });

  // Update pending friends invitations list
  friends.updateFriendsPendingInvitations(userId);

  // Send friends list
  friends.sendFriendsList(userId);
};
