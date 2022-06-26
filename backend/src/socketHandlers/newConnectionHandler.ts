import { Server, Socket } from 'socket.io';
import serverStore from '../serverStore';

/**
 * Handle the connection of a new user to the socket server.
 * Will add the new user to the connected users Map (in-memory store).
 * @param socket - socket object
 * @param io - socket.io server
 */
// eslint-disable-next-line
export const newConnectionHandler = async (socket: Socket, io: Server) => {
  const userDetails = await socket.data.user;

  serverStore.addNewConnectedUser({
    userId: userDetails.id,
    socketId: socket.id,
  });

  console.log('Connected users: ');
  console.log(serverStore.connectedUsers);
};
