import { DirectChatHistory, IDirectMessage } from '@/typings/typings';
import { chatActions } from '../store/features/chat/chatSlice';
import { store } from '@/store/store';

/**
 * @desc Update the chat history if the chat is active.
 * @param param0 - participants. Array of userIds
 * @param param1 - usersInActiveConversation. Array of userIds
 * @param param2 - messages. Array of messages
 */
const updateChatHistoryIfUsersAreInSameConversation = ({
  participants,
  usersInActiveConversation,
  messages
}: {
  participants: string[];
  usersInActiveConversation: string[];
  messages: IDirectMessage[];
}) => {
  const areUsersInSameConversation = participants.every(participant => usersInActiveConversation.includes(participant));

  if (areUsersInSameConversation) {
    store.dispatch(chatActions.setMessages(messages));
  } else {
    store.dispatch(chatActions.setMessages([]));
  }
};

/**
 * @desc Update the chat history if the users are in the same conversation.
 * @param data - direct chat history. @see DirectChatHistory
 */
export const updateDirectChatHistoryIfActive = (
  data: DirectChatHistory
) => {
  const { participants, messages } = data;

  // Find the id of the current user from the token and the id from the active conversation
  const receiverUserId = store.getState().chat.chosenChatDetails?.friendId;
  const userId = store.getState().auth.user?._id;

  if (receiverUserId && userId) {
    const usersInActiveConversation = [userId, receiverUserId];

    updateChatHistoryIfUsersAreInSameConversation({
      participants,
      usersInActiveConversation,
      messages
    });
  }
};
