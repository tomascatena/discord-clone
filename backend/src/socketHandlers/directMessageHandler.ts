import { Logger } from '@/config/logger';
import { ObjectId } from 'mongoose';
import { Socket } from 'socket.io';
import Conversation from '@/features/conversations/conversation.model';
import Message from '@/features/conversations/message.model';

type DirectMessage = {
  message: string;
  receiverUserId: string;
};

/**
 * @desc Handle the direct message. Will create a new message in the conversation. If the conversation does not exist, it will create a new one.
 * @param socket - socket object
 * @param data - direct message data. @see DirectMessage.
 */
// eslint-disable-next-line
export const directMessageHandler = async (socket: Socket, data: DirectMessage) => {
  try {
    const userDetails = await socket.data.user;
    const { message, receiverUserId } = data;

    if (!userDetails) {
      return;
    }

    const userId = userDetails._id.toString() as ObjectId;

    // Create new message
    const newMessage = await Message.create({
      content: message,
      author: userId,
      date: new Date(),
      type: 'DIRECT',
    });

    // Find if conversation exists between the two users, if not create it
    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
    });

    if (conversation) {
      // Add message to conversation
      conversation.messages.push(newMessage._id);

      await conversation.save();

      // Update to sender and receiver if they are online
    } else {
      const newConversation = await Conversation.create({
        messages: [newMessage._id],
        participants: [userId, receiverUserId],
      });

      console.log('New conversation created: ', newConversation);

      // Update to sender and receiver if they are online
    }
  } catch (error) {
    Logger.error(error);
  }
};
