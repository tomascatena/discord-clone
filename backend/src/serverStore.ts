const connectedUsers = new Map();

type AddNewConnectedUserParams = {
  socketId: string;
  userId: string;
};

/**
 * Add new connected user to the in-memory Map used to store connected users.
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
 * Remove disconnected user from the in-memory Map used to store connected users.
 * @param socketId - socket id of the disconnected user
 */
const removeConnectedUser = (socketId: string) => {
  connectedUsers.delete(socketId);
};

export default {
  connectedUsers,
  addNewConnectedUser,
  removeConnectedUser,
};
