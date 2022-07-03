import { IChatDetails, IMessage } from '@/typings/typings';
import { MessagesWrapper } from './Messages.styled';
import Message from '@/components/Messenger/Message/Message';
import MessagesHeader from '@/components/Messenger/MessagesHeader/MessagesHeader';
import React from 'react';
import isSameDay from 'date-fns/isSameDay';
import parse from 'date-fns/parse';

type Props = {
  messages: IMessage[];
  chosenChatDetails: IChatDetails;
}

const Messages:React.FC<Props> = ({ chosenChatDetails, messages }) => {
  const parseDate = (date: string) => parse(date, 'dd/MM/yyyy', new Date());

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
              parseDate(messages[index > 0 ? index - 1 : index].date),
              parseDate(messages[index].date)
            )}
          />
        );
      })}
    </MessagesWrapper>
  );
};

export default Messages;
