import { styled } from '@mui/system';

type RoomContainerProps = {
  isMinimized: boolean;
}

export const RoomContainer = styled('div', {
  shouldForwardProp: prop => prop !== 'isMinimized',
})<RoomContainerProps>(({ isMinimized }) => ({
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#202225',

  ...(isMinimized ? {
    bottom: '0',
    right: '0',
    width: '30%',
    height: '40vh',
  } : {
    width: '100%',
    height: '100vh',
  })
}));
