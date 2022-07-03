import { MessengerContentWrapper } from './MessengerContent.styled';
import Messages from '@/components/Messenger/Messages/Messages';
import NewMessageInput from '@/components/Messenger/NewMessageInput/NewMessageInput';
import React from 'react';

type Props = {}

const MessengerContent:React.FC<Props> = () => {
  return (
    <MessengerContentWrapper>
      <Messages />

      <NewMessageInput />
    </MessengerContentWrapper>
  );
};

export default MessengerContent;
