import { Socket } from 'socket.io';
import serverStore from '../serverStore';

/**
 * Handle the disconnection of a user from the socket server.
 * Will remove the user from the connected users Map (in-memory store).
 * @param socket - socket object
 */
export const disconnectHandler = (socket: Socket) => {
  serverStore.removeConnectedUser(socket.id);

  console.log('New connected users: ');
  console.log(serverStore.connectedUsers);
};
