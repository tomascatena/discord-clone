import { DirectChatHistory, IDirectMessage } from '@/typings/typings';
import { chatActions } from '../store/features/chat/chatSlice';
import { store } from '@/store/store';

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

  store.dispatch(chatActions.setMessages(data.messages));
};
