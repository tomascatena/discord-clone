import { styled } from '@mui/system';
import Button from '@mui/material/Button';

export const SidebarContainer = styled('div')(({ theme }) => ({
  width: '72px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#202225',
  paddingTop: theme.spacing(2),
  paddingRight: theme.spacing(1),
}));

export const MainButton = styled(Button)({
  width: '42px',
  height: '42px',
  borderRadius: '16px',
  margin: 0,
  padding: 0,
  minWidth: 0,
  color: 'white',
  backgroundColor: '#666',

  ':hover': {
    backgroundColor: '#888'
  }
});
