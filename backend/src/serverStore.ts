import { Server } from 'socket.io';

type ConnectedUserInfo = {
  userId: string;
};

const connectedUsers = new Map<string, ConnectedUserInfo>();

let io: Server;

const setSocketServerInstance = (server: Server) => {
  io = server;
};

const getSocketServerInstance = () => {
  return io;
};

type AddNewConnectedUserParams = {
  socketId: string;
  userId: string;
};

/**
 * @desc Add new connected user to the in-memory Map used to store connected users.
 * @param socketId - socket id of the new connected user
 * @param userId - user id of the new connected user
 */
const addNewConnectedUser = ({
  socketId,
  userId,
}: AddNewConnectedUserParams) => {
  connectedUsers.set(socketId, { userId });
};

/**
 * @desc Remove disconnected user from the in-memory Map used to store connected users.
 * @param socketId - socket id of the disconnected user
 */
const removeConnectedUser = (socketId: string) => {
  connectedUsers.delete(socketId);
};

/**
 * @desc Get the active connections array of a user with id of userId.
 */
const getOnlineUsers = (userId: string) => {
  const activeConnections: string[] = [];

  connectedUsers.forEach((user, socketId) => {
    if (user.userId === userId) {
      activeConnections.push(socketId);
    }
  });

  return activeConnections;
};

export default {
  connectedUsers,
  addNewConnectedUser,
  removeConnectedUser,
  getOnlineUsers,
  setSocketServerInstance,
  getSocketServerInstance,
};
