import { DirectChatHistory, IFriend, IOnlineUser, IPendingInvitation, IUser, RoomDetails } from '@/typings/typings';
import { Socket, io } from 'socket.io-client';
import { friendsActions } from '@/store/features/friends/friendsSlice';
import { store } from '@/store/store';
import { updateDirectChatHistoryIfActive } from '@/utils/chat';
import roomHandler from '@/realtimeCommunication/roomHandler';

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

  socket.on('direct-chat-history', (data: DirectChatHistory) => {
    updateDirectChatHistoryIfActive(data);
  });

  socket.on('room-create', (data) => {
    const roomDetails = data.roomDetails as RoomDetails;

    roomHandler.newRoomCreated(roomDetails);
  });

  socket.on('active-rooms', (data) => {
    const activeRooms = data.activeRooms as RoomDetails[];

    roomHandler.updateActiveRooms(activeRooms);
  });

  socket.on('connect_error', (err) => {
    console.error(err);
  });
};

type SendDirectMessageParams = {
  message: string;
  receiverUserId: string;
}

export const sendDirectMessage = (data: SendDirectMessageParams) => {
  socket.emit('direct-message', data);
};

type GetDirectChatHistoryParams = {
  receiverUserId: string;
}

export const getDirectChatHistory = (data: GetDirectChatHistoryParams) => {
  socket.emit('direct-chat-history', data);
};

export const emitRoomCreate = () => {
  socket.emit('room-create');
};
