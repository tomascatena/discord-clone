import { Box } from '@mui/material';
import { styled } from '@mui/system';
import darkTheme from '@themes/darkTheme';

export const BoxWrapper = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  width: 700,
  height: 400,
  backgroundColor: theme.palette.grey[900],
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: darkTheme.shadows[9],
  padding: theme.spacing(2),
}));
