import { IChatDetails } from '../../../typings/typings';
import { MessengerContentWrapper } from './MessengerContent.styled';
import Messages from '../Messages/Messages';
import NewMessageInput from '../NewMessageInput/NewMessageInput';
import React from 'react';

type Props = {
  chosenChatDetails: IChatDetails;
}

const MessengerContent:React.FC<Props> = ({ chosenChatDetails }) => {
  React.useEffect(() => {
    // TODO: fetching chat history from a specific userId
    console.log('chosenChatDetails', chosenChatDetails);
  }, [chosenChatDetails]);

  return (
    <MessengerContentWrapper>
      <Messages />

      <NewMessageInput />
    </MessengerContentWrapper>
  );
};

export default MessengerContent;
