import { IFriend, IOnlineUser, IPendingInvitation, IUser } from '../typings/typings';
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
  userData, // eslint-disable-line @typescript-eslint/no-unused-vars
  accessToken
}: ConnectWithSocketServerParams) => {
  socket = io('http://localhost:5000', {
    auth: {
      token: accessToken
    }
  });

  socket.on('connect', () => {
    console.log('Connected to socket server');
  });

  socket.on('friends-invitations', (data) => {
    const pendingInvitations = data.pendingInvitations as IPendingInvitation[];

    store.dispatch(friendsActions.setPendingFriendsInvitations(pendingInvitations));
  });

  socket.on('friends-list', (data) => {
    const friends = data.friends as IFriend[];

    store.dispatch(friendsActions.setFriends(friends));
  });

  socket.on('online-users', (data) => {
    const onlineUsers = data.onlineUsers as IOnlineUser[];

    store.dispatch(friendsActions.setOnlineUsers(onlineUsers));
  });

  socket.on('connect_error', (err) => {
    console.error(err);
  });
};
