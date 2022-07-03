import { Typography } from '@mui/material';
import { WelcomeMessageContainer } from './WelcomeMessage.styled';
import React from 'react';

const WelcomeMessage:React.FC = () => {
  return (
    <WelcomeMessageContainer>
      <Typography
        variant='h6'
        color={'textPrimary'}
      >
        Choose a friend to start chatting
      </Typography>
    </WelcomeMessageContainer>
  );
};

export default WelcomeMessage;
