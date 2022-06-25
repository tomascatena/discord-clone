import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';

export const StyledSpan = styled('span')({
  marginLeft: '0.8rem',
});

type StyledBadgeProps = {
  isOnline: boolean;
}

export const StyledBadge = styled(Badge, {
  shouldForwardProp: props => !['isOnline'].includes(props as string),
})<StyledBadgeProps>(({ theme, isOnline }) => ({
  '& .MuiBadge-badge': {
    height: '.75rem',
    width: '.75rem',
    borderRadius: '50%',
    backgroundColor: isOnline ? '#44b700' : '#999',
    color: isOnline ? '#44b700' : '#666',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,

    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      ...(isOnline && { animation: 'ripple 1.2s infinite ease-in-out' }),
      border: '1px solid currentColor',
      content: '""',
    },
  },

  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

type StyledButtonProps = {
  isOnline: boolean;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: props => !['isOnline'].includes(props as string),
})<StyledButtonProps>(({ isOnline }) => ({
  width: '100%',
  height: '42px',
  marginTop: '10px',
  display: 'inline',
  textTransform: 'none',
  color: 'black',
  position: 'relative',
  backgroundColor: isOnline ? '#aaa' : '#555',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',

  '&:hover': {
    backgroundColor: isOnline ? '#ddd' : '#444',
  },
}));
