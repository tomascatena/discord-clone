import { styled } from '@mui/system';

export const AppBarContainer = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  right: 0,
  height: '48px',
  borderBottom: '1px solid #202225',
  backgroundColor: '#36393F',
  width: 'calc(100% - 224px - 72px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0 16px',
}));
