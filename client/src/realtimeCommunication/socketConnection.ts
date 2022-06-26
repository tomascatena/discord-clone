import { IUser } from '../typings/typings';
import { Socket, io } from 'socket.io-client';

let socket: Socket;

type ConnectWithSocketServerParams = {
  userData: IUser;
  accessToken: string;
}

/**
 * Connect with the socket server.
 * @param object
 * @property userData - user data of the new connected user
 * @property accessToken - access JWT of the new connected user
 */
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

  socket.on('connect_error', (err) => {
    console.log(err instanceof Error); // true
    console.log(err.message); // not authorized
    console.log(err);
  });
};
