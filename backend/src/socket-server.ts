import { Logger } from './config/logger';
import { Server as SocketIOServer } from 'socket.io';
import { verifyTokenSocket } from './middleware/authSocket';
import http from 'http';

export const registerSocketServer = (server: http.Server) => {
  Logger.info('Socket Server connected');

  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.use(verifyTokenSocket);

  io.on('connection', (socket) => {
    console.log('a user connected');
    console.log('socket id', socket.id);

    // New connection from client
    socket.on('newConnection', (data) => {
      console.log('newConnection', data);
    });

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};
