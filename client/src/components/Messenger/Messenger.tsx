import { MessengerContainer } from './Messenger.styled';
import { useTypedSelector } from '@hooks/useTypedSelector';
import MessengerContent from '@components/Messenger/MessengerContent/MessengerContent';
import React from 'react';
import WelcomeMessage from './WelcomeMessage/WelcomeMessage';

type Props = {}

const Messenger:React.FC<Props> = () => {
  const { chosenChatDetails } = useTypedSelector(state => state.chat);

  React.useEffect(() => {
    // TODO: fetching chat history from a specific userId
    console.log('chosenChatDetails', chosenChatDetails);
  }, [chosenChatDetails]);

  return (
    <MessengerContainer>
      {
        chosenChatDetails
          ? <MessengerContent/>
          : <WelcomeMessage />
      }
    </MessengerContainer>
  );
};

export default Messenger;
