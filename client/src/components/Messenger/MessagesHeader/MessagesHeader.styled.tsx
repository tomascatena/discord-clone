import { styled } from '@mui/system';

export const MessagesHeaderContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '0.5rem',
  gap: theme.spacing(2)
}));

export const FriendDetails = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2)
}));
