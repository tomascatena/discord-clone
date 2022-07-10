import { Logger } from '@/config/logger';
import { Server as SocketIOServer } from 'socket.io';
import { directChatHistoryHandler } from '@/socketHandlers/directChatHistoryHandler';
import { directMessageHandler } from './socketHandlers/directMessageHandler';
import { disconnectHandler } from '@/socketHandlers/disconnectHandler';
import { newConnectionHandler } from '@/socketHandlers/newConnectionHandler';
import { roomCreateHandler } from '@/socketHandlers/roomCreateHandler';
import { verifyTokenSocket } from '@/middleware/authSocket';
import http from 'http';
import serverStore from './serverStore';

export const registerSocketServer = (server: http.Server) => {
  Logger.info('Socket Server connected');

  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  serverStore.setSocketServerInstance(io);

  io.use(verifyTokenSocket);

  const emitOnlineUsers = () => {
    io.emit('online-users', { onlineUsers: serverStore.getOnlineUsers() });
  };

  io.on('connection', (socket) => {
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on('direct-message', (data) => {
      directMessageHandler(socket, data);
    });

    socket.on('direct-chat-history', (data) => {
      directChatHistoryHandler(socket, data);
    });

    socket.on('room-create', () => {
      roomCreateHandler(socket);
    });

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  io.on('error', (err) => {
    Logger.error(err);
  });

  // Emit list of online users every 5 seconds
  setInterval(() => {
    emitOnlineUsers();
  }, 5000);
};
