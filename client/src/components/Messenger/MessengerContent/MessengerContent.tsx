import { MessengerContentWrapper } from './MessengerContent.styled';
import Messages from '../Messages/Messages';
import NewMessageInput from '../NewMessageInput/NewMessageInput';
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
