import { MessengerContainer } from './Messenger.styled';
import { Typography } from '@mui/material';
import { WelcomeMessageContainer } from '@components/MessengerContent/MessagerContent';
import { useTypedSelector } from '@hooks/useTypedSelector';
import MessengerContent from '@components/MessengerContent/MessengerContent';
import React from 'react';

type Props = {}

const Messenger:React.FC<Props> = () => {
  const { chosenChatDetails } = useTypedSelector(state => state.chat);

  return (
    <MessengerContainer>
      {!chosenChatDetails ? (
        <WelcomeMessageContainer>
          <Typography
            variant='h6'
            sx={{
              color: 'text.primary',
            }}
          >
            Choose a friend to start chatting
          </Typography>
        </WelcomeMessageContainer>
      ) : (
        <div>
          <MessengerContent chosenChatDetails={chosenChatDetails} />
        </div>
      )}
    </MessengerContainer>
  );
};

export default Messenger;
