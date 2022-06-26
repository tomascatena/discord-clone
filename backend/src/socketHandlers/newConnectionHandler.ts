import { Server, Socket } from 'socket.io';
import serverStore from '../serverStore';

// eslint-disable-next-line
export const newConnectionHandler = async (socket: Socket, io: Server) => {
  const userDetails = await socket.data.user;

  serverStore.addNewConnectedUser({
    userId: userDetails.id,
    socketId: socket.id,
  });

  console.log(serverStore.connectedUsers);
};
