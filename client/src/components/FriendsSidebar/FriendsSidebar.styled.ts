import { styled } from '@mui/system';

export const FriendsSidebarContainer = styled('div')(({ theme }) => ({
  width: '224px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#2F3136',
  paddingTop: theme.spacing(3)
}));

export const ListsContainer = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'auto',
  paddingTop: theme.spacing(2)
}));
