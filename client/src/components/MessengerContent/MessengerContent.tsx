import { IChatDetails } from '../../typings/typings';
import React from 'react';

type Props = {
  chosenChatDetails: IChatDetails;
}

const MessengerContent:React.FC<Props> = ({ chosenChatDetails }) => {
  return (
    <div>{chosenChatDetails.friendUsername}</div>
  );
};

export default MessengerContent;
