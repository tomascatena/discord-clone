import { ObjectId } from 'mongoose';
import FriendInvitation from './friendInvitation.model';
import userService from '@/features/user/user.service';

type FriendInvitationParam = {
  senderId: string;
  receiverId: string;
};

type AcceptFriendInvitationParam = {
  invitationId: string;
  senderId: string;
  receiverId: string;
};

type PopulatedInvitation = {
  _id: ObjectId;
  senderId: {
    _id: ObjectId;
    username: string;
    email: string;
  };
  receiverId: {
    _id: ObjectId;
    username: string;
    email: string;
  };
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

const deleteInvitationById = async (invitationId: string) => {
  const invitation = await FriendInvitation.findByIdAndDelete(invitationId);

  return invitation;
};

/**
 * @desc Get an invitation by its id, by default will populate the sender and receiver
 * @param id The id of the invitation to get
 * @param fieldsToPopulate The fields to populate (e.g. senderId, receiverId)
 * @param fieldsToSelect The fields to select (e.g. _id, senderId, receiverId)
 * @returns The invitation with the specified fields populated
 */
const getInvitationById = async (
  id: string,
  fieldsToPopulate = 'senderId receiverId',
  fieldsToSelect = '_id username email'
) => {
  const invitation = (await FriendInvitation.findById(id).populate(
    fieldsToPopulate,
    fieldsToSelect
  )) as PopulatedInvitation;

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

/**
 * @desc Accept a friend invitation request from user. it will add the user to the friend list of the other user and vice versa.
 * @param object The parameters of the invitation to accept
 * @param object.invitationId The id of the invitation to accept
 * @param object.senderId The id of the user who sent the invitation
 * @param object.receiverId The id of the user accepting the invitation
 */
const acceptInvitation = async ({
  invitationId,
  senderId,
  receiverId,
}: AcceptFriendInvitationParam) => {
  await userService.addFriendToUser({
    userId: senderId,
    friendId: receiverId,
  });

  await userService.addFriendToUser({
    userId: receiverId,
    friendId: senderId,
  });

  await deleteInvitationById(invitationId);
};

const rejectInvitation = async (invitationId: string) => {
  await deleteInvitationById(invitationId);
};

export default {
  getInvitation,
  getInvitationById,
  createInvitation,
  acceptInvitation,
  rejectInvitation,
  deleteInvitationById,
};
