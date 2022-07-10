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
  zIndex: 2,
  transition: 'all 0.3s ease',
  bottom: '0',
  right: '0',

  ...(isMinimized ? {
    width: '30%',
    height: '40vh',
    borderRadius: '10px',
  } : {
    width: '100%',
    height: '100vh',
    borderRadius: 'none',
  })
}));
