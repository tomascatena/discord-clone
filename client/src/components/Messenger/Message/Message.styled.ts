import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const MainContainer = styled('div')(() => ({
  display: 'flex',

  '& .hidden-date': {
    opacity: 0,
    transition: 'all 0.2s ease-in-out 0.1s',
  },

  '&:hover .hidden-date': {
    opacity: 1,
  },

  '& .hidden-message-time': {
    opacity: 0.3,
    transition: 'all 0.2s ease-in-out 0.1s',
  },

  '&:hover .hidden-message-time': {
    opacity: 1,
  }
}));

export const AvatarContainer = styled('div')(() => ({
  width: '4rem',
}));

export const MessageContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const MessageContent = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const UsernameAndDateContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  alignItems: 'center',
}));
