import { Logger, LoggerToFile } from '@/config/logger';
import Conversation from '@/features/conversations/conversation.model';
import serverStore from '@/serverStore';

const updateChatHistory = async (
  {
    conversationId,
    toSpecifiedSocketId,
  }: {
    conversationId: string;
    toSpecifiedSocketId?: string | null;
  } = {
    conversationId: '',
    toSpecifiedSocketId: null,
  }
) => {
  if (!conversationId) {
    return;
  }

  try {
    const conversation = await Conversation.findById(conversationId).populate({
      path: 'messages',
      model: 'Message',
      populate: {
        path: 'author',
        model: 'User', // populate the author field with the user model
        select: 'username _id',
      },
    });

    console.log('Conversation: ', conversation);

    if (!conversation) {
      return;
    }

    const io = serverStore.getSocketServerInstance();

    const emitChatHistory = (socketId: string) => {
      io.to(socketId).emit('direct-chat-history', {
        messages: conversation.messages,
        participants: conversation.participants,
      });
    };

    if (toSpecifiedSocketId) {
      // Initial update of chat history to the specified socket
      emitChatHistory(toSpecifiedSocketId);
    } else {
      // Check if users are online
      conversation.participants.forEach((participantId) => {
        const activeConnections = serverStore.getActiveConnections(
          participantId.toString()
        );

        // Send the chat history to the user's active connections
        activeConnections.forEach((socketId) => emitChatHistory(socketId));
      });

      // Send the chat history to the user's active connections
    }
  } catch (err) {
    Logger.error(err);

    const errorToLog = {
      message: 'Error occurred in updateChatHistory',
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

export default { updateChatHistory };
