import mongoose, { ObjectId } from 'mongoose';

export interface IMessage {
  _id: string;
  author: ObjectId;
  content: string;
  date?: Date;
  type: 'DIRECT' | 'GROUP';
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    type: {
      type: String,
      enum: ['DIRECT', 'GROUP'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Message = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
