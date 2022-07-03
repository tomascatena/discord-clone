import { styled } from '@mui/system';

export const MessagesWrapper = styled('div')(({ theme }) => ({
  flex: 1,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
}));
