import { IChatDetails } from '@/typings/typings';
import { NewMessageContainer, StyledInput, StyledInputContainer } from './NewMessageInput.styled';
import React from 'react';

type Props = {
  chosenChatDetails: IChatDetails;
};

const NewMessageInput: React.FC<Props> = ({ chosenChatDetails }) => {
  const [message, setMessage] = React.useState('');

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Sending message...', message);
      setMessage('');
    }
  };

  return (
    <NewMessageContainer>
      <StyledInputContainer>
        <StyledInput
          autoCorrect='on'
          placeholder={`Type a message to ${chosenChatDetails.friendUsername}...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </StyledInputContainer>
    </NewMessageContainer>
  );
};

export default NewMessageInput;
