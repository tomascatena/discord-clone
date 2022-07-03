import { Box } from '@mui/material';
import { styled } from '@mui/system';
import darkTheme from '@/themes/darkTheme';

export const StyledBox = styled(Box)(({ theme }) => ({
  width: 700,
  minHeight: 400,
  backgroundColor: theme.palette.grey[900],
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: darkTheme.shadows[15],
  padding: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    width: '80%',
    margin: theme.spacing(2),
  },

  [theme.breakpoints.down('sm')]: {
    width: '100%',
    margin: theme.spacing(2),
  }
}));
