import { IChatDetails, IDirectMessage } from '@/typings/typings';
import { MessagesWrapper } from './Messages.styled';
import Message from '@/components/Messenger/Message/Message';
import MessagesHeader from '@/components/Messenger/MessagesHeader/MessagesHeader';
import React from 'react';
import isSameDay from 'date-fns/isSameDay';
import parseISO from 'date-fns/parseISO';

type Props = {
  messages: IDirectMessage[];
  chosenChatDetails: IChatDetails;
}

const Messages:React.FC<Props> = ({ chosenChatDetails, messages }) => {
  return (
    <MessagesWrapper>
      <MessagesHeader chosenChatDetails={chosenChatDetails} />

      {messages.map((message, index) => {
        const isSameAuthor = index > 0 && messages[index - 1].author._id === message.author._id;

        return (
          <Message
            key={message._id}
            message={message}
            isSameAuthor={isSameAuthor}
            isSameDay={isSameDay(
              parseISO(messages[index > 0 ? index - 1 : index].date),
              parseISO(messages[index].date)
            )}
          />
        );
      })}
    </MessagesWrapper>
  );
};

export default Messages;
