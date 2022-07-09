import { Logger, LoggerToFile } from '@/config/logger';
import { ObjectId } from 'mongoose';
import { Socket } from 'socket.io';
import Conversation from '@/features/conversations/conversation.model';
import chatUpdates from '@/socketHandlers/updates/chat';

type DirectChatHistoryData = {
  receiverUserId: string;
};

/**
 * @desc Handle the direct-chat-history event. Will find a conversation between the two users and call updateChatHistory.
 * @param socket - socket object
 * @param data - direct chat history data. @see DirectChatHistoryData.
 */
export const directChatHistoryHandler = async (
  socket: Socket,
  data: DirectChatHistoryData
) => {
  const userDetails = await socket.data.user;

  if (!userDetails) {
    return;
  }

  try {
    const userId = userDetails._id.toString() as ObjectId;
    const { receiverUserId } = data;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverUserId] },
      type: 'DIRECT',
    });

    if (conversation) {
      chatUpdates.updateChatHistory({
        conversationId: conversation._id.toString(),
        toSpecifiedSocketId: socket.id,
      });
    } else {
      // Create new conversation between the two users
      const newConversation = await Conversation.create({
        messages: [],
        participants: [userId, receiverUserId],
      });

      // Update to sender and receiver if they are online
      chatUpdates.updateChatHistory({
        conversationId: newConversation._id.toString(),
        toSpecifiedSocketId: socket.id,
      });
    }
  } catch (err) {
    Logger.error(err);

    const errorToLog = {
      message: 'Error occurred in directChatHistoryHandler',
      ...(err instanceof Error
        ? {
            error: {
              message: err.message,
              name: err.name,
              stack: err.stack,
            },
          }
        : { err }),
    };

    LoggerToFile.error(errorToLog);
  }
};
