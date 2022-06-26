import mongoose, { ObjectId } from 'mongoose';

export interface IFriendInvitation {
  _id: string;
  senderId: ObjectId;
  receiverId: ObjectId;
}

const friendInvitationSchema = new mongoose.Schema<IFriendInvitation>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FriendInvitation = mongoose.model<IFriendInvitation>(
  'FriendInvitation',
  friendInvitationSchema
);

export default FriendInvitation;
