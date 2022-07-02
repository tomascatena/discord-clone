import { Logger } from '@/config/logger';
import { Server as SocketIOServer } from 'socket.io';
import { disconnectHandler } from '@/socketHandlers/disconnectHandler';
import { newConnectionHandler } from '@/socketHandlers/newConnectionHandler';
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
    const onlineUsers = serverStore.getOnlineUsers();

    io.emit('online-users', { onlineUsers });
  };

  io.on('connection', (socket) => {
    newConnectionHandler(socket, io);
    emitOnlineUsers();

    socket.on('disconnect', () => {
      disconnectHandler(socket);
    });
  });

  // Emit list of online users every 5 seconds
  setInterval(() => {
    emitOnlineUsers();
  }, 5000);
};
