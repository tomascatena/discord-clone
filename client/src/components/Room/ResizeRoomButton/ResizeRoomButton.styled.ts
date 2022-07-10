import { styled } from '@mui/system';

export const ResizeRoomButtonContainer = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: theme.spacing(1),
  right: theme.spacing(1),

  '&:hover svg': {
    transform: 'scale(1.2)',
    cursor: 'pointer',
  }
}));
