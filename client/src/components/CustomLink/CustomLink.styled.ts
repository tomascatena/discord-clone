import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));
