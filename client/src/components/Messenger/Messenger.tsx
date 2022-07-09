import { MessengerContainer } from './Messenger.styled';
import { getDirectChatHistory } from '../../realtimeCommunication/socketConnection';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import MessengerContent from '@/components/Messenger/MessengerContent/MessengerContent';
import React from 'react';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';

type Props = {}

const Messenger:React.FC<Props> = () => {
  const { chosenChatDetails, messages } = useTypedSelector(state => state.chat);

  React.useEffect(() => {
    if (chosenChatDetails) {
      getDirectChatHistory({
        receiverUserId: chosenChatDetails.friendId,
      });
    }
  }, [chosenChatDetails]);

  return (
    <MessengerContainer>
      {
        chosenChatDetails
          ? <MessengerContent
              messages={messages}
              chosenChatDetails={chosenChatDetails}
            />
          : <WelcomeMessage />
      }
    </MessengerContainer>
  );
};

export default Messenger;
