import { Socket, io } from 'socket.io-client';

let socket: Socket;

export const connectWithSocketServer = () => {
  socket = io('http://localhost:5000');

  socket.on('connect', () => {
    console.log('Connected to socket server');
    console.log('socket id', socket.id);
  });
};
