import { Socket } from 'socket.io';
import roomUpdates from '@/socketHandlers/updates/rooms';
import serverStore from '@/serverStore';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const roomCreateHandler = (socket: Socket) => {
  const socketId = socket.id;
  const userDetails = socket.data.user;

  if (!userDetails) {
    return;
  }

  const userId = userDetails._id.toString();

  const roomDetails = serverStore.addNewActiveRoom(userId, socketId);

  socket.emit('room-create', {
    roomDetails,
  });

  roomUpdates.updateRooms();
};
