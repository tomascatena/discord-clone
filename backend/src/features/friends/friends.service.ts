import FriendInvitation from './friendInvitation.model';

type FriendInvitationParam = {
  senderId: string;
  receiverId: string;
};

const getInvitation = async ({
  senderId,
  receiverId,
}: FriendInvitationParam) => {
  const invitation = await FriendInvitation.findOne({
    senderId,
    receiverId,
  });

  return invitation;
};

const createInvitation = async ({
  senderId,
  receiverId,
}: FriendInvitationParam) => {
  const invitation = await FriendInvitation.create({
    senderId,
    receiverId,
  });

  return invitation;
};

export default {
  getInvitation,
  createInvitation,
};
