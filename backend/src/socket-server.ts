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

  io.on('connection', (socket) => {
    console.log('a user connected');
    console.log('socket id', socket.id);

    newConnectionHandler(socket, io);

    socket.on('disconnect', () => {
      console.log('user disconnected');

      disconnectHandler(socket);
    });
  });
};
