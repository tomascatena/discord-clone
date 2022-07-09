import { IChatDetails, IMessage } from '@/typings/typings';
import { MessengerContentWrapper } from './MessengerContent.styled';
import Messages from '@/components/Messenger/Messages/Messages';
import NewMessageInput from '@/components/Messenger/NewMessageInput/NewMessageInput';
import React from 'react';

type Props = {
  messages: IMessage[];
  chosenChatDetails: IChatDetails;
}

const MessengerContent:React.FC<Props> = ({ messages, chosenChatDetails }) => {
  return (
    <MessengerContentWrapper>
      <Messages
        messages={messages}
        chosenChatDetails={chosenChatDetails}
      />

      <NewMessageInput chosenChatDetails={chosenChatDetails}/>
    </MessengerContentWrapper>
  );
};

export default MessengerContent;
