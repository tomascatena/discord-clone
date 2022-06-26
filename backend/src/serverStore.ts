const connectedUsers = new Map();

type AddNewConnectedUserParams = {
  socketId: string;
  userId: string;
};

const addNewConnectedUser = ({
  socketId,
  userId,
}: AddNewConnectedUserParams) => {
  connectedUsers.set(socketId, userId);
};

export default {
  connectedUsers,
  addNewConnectedUser,
};
