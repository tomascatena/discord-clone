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

type MainButtonProps = {
  marginTop?: number;
}

export const MainButton = styled(Button, {
  shouldForwardProp: prop => prop !== 'marginTop',
})<MainButtonProps>(({ theme, marginTop = 0 }) => ({
  width: '42px',
  height: '42px',
  borderRadius: '16px',
  margin: 0,
  padding: 0,
  minWidth: 0,
  color: 'white',
  backgroundColor: '#666',
  marginTop: theme.spacing(marginTop),

  ':hover': {
    backgroundColor: '#888'
  }
}));
