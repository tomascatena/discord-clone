import mongoose from 'mongoose';

export interface IConversation {
  _id: string;
  participants: string[];
  messages: string[];
}

const conversationSchema = new mongoose.Schema<IConversation>(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model<IConversation>(
  'Conversation',
  conversationSchema
);

export default Conversation;
