import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const StyledSpan = styled('span')({
  marginLeft: '0.8rem',
});

type StyledButtonProps = {
  isActive: boolean;
}

export const StyledButton = styled(Button, {
  shouldForwardProp: props => !['isActive'].includes(props as string),
})<StyledButtonProps>(({ isActive }) => ({
  width: '100%',
  height: '42px',
  marginTop: '10px',
  display: 'inline',
  textTransform: 'none',
  color: 'black',
  position: 'relative',
  backgroundColor: isActive ? '#aaa' : '#555',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: isActive ? '#ddd' : '#444',
  },
}));
