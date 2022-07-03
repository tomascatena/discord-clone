import { IChatDetails, IMessage } from '@/typings/typings';
import { MessagesWrapper } from './Messages.styled';
import Message from '@/components/Messenger/Message/Message';
import MessagesHeader from '@/components/Messenger/MessagesHeader/MessagesHeader';
import React from 'react';

type Props = {
  messages: IMessage[];
  chosenChatDetails: IChatDetails;
}

const Messages:React.FC<Props> = ({ chosenChatDetails, messages }) => {
  return (
    <MessagesWrapper>
      <MessagesHeader chosenChatDetails={chosenChatDetails} />

      {messages.map(message => (
        <Message
          key={message._id}
          message={message}
          chosenChatDetails={chosenChatDetails}
        />
      ))}
    </MessagesWrapper>
  );
};

export default Messages;
