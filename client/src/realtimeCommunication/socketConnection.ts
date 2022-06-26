import { IUser } from '../typings/typings';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

type ConnectWithSocketServerParams = {
  userData: IUser;
  accessToken: string;
}

export const connectWithSocketServer = ({
  userData,
  accessToken
}: ConnectWithSocketServerParams) => {
  console.log('userData', userData);
  console.log('accessToken', accessToken);

  socket = io('http://localhost:5000', {
    auth: {
      token: accessToken
    }
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
    console.log('socket id', socket.id);
  });
};
