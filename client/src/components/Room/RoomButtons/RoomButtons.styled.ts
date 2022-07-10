import { styled } from '@mui/system';

export const RoomButtonsContainer = styled('div')(({ theme }) => ({
  height: '4rem',
  width: '100%',
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.dark,
  color: 'white',
  gap: theme.spacing(2),
}));
