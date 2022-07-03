import { IChatDetails, IMessage } from '@/typings/typings';
import React from 'react';

type Props = {
  message: IMessage;
  chosenChatDetails: IChatDetails;
}

const Message:React.FC<Props> = ({ message }) => {
  return (
    <div>{message.content}</div>
  );
};

export default Message;
