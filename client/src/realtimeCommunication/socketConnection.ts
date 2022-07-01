import { IUser } from '../typings/typings';
import { Socket, io } from 'socket.io-client';
import { friendsActions } from '@store/features/friends/friendsSlice';
import { store } from '@store/store';

let socket: Socket;

type ConnectWithSocketServerParams = {
  userData: IUser;
  accessToken: string;
}

/**
 * @desc Connect with the socket server.
 * @param object
 * @property userData - user data of the new connected user
 * @property accessToken - access JWT of the new connected user
 */
export const connectWithSocketServer = ({
  userData,
  accessToken
}: ConnectWithSocketServerParams) => {
  console.log('userData', userData);

  socket = io('http://localhost:5000', {
    auth: {
      token: accessToken
    }
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
    console.log('socket id', socket.id);
  });

  socket.on('friends-invitations', (data) => {
    const { pendingInvitations } = data;

    store.dispatch(friendsActions.setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('connect_error', (err) => {
    console.error(err);
  });
};
