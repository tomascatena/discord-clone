import { styled } from '@mui/system';

export const SidebarContainer = styled('div')(({ theme }) => ({
  width: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
  paddingTop: theme.spacing(2)
}));
