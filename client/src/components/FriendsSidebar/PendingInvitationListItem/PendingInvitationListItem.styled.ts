import { Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';

type StyledBoxProps = {
  isActive: boolean;
}

export const StyledBox = styled(Box, {
  shouldForwardProp: props => !['isActive'].includes(props as string),
})<StyledBoxProps>(({ isActive }) => ({
  width: '100%',
  height: '42px',
  marginTop: '10px',
  display: 'flex',
  alignItems: 'center',
  textTransform: 'none',
  color: 'black',
  position: 'relative',
  backgroundColor: isActive ? '#999' : '#666',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  overflow: 'hidden',
  borderRadius: '0.5rem',
  paddingLeft: '0.4rem',

  '&:hover': {
    backgroundColor: isActive ? '#777' : '#aaa',
  },
}));

export const IconsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '.7rem',
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
});

type StyledIconButtonProps = {
  iconColor:string,
}

export const StyledIconButton = styled(IconButton, {
  shouldForwardProp: props => !['iconColor'].includes(props as string),
})<StyledIconButtonProps>(({ iconColor }) => ({
  height: '2rem',
  width: '2rem',
  color: iconColor,
  backgroundColor: '#bbb',

  ':hover': {
    backgroundColor: '#fff',
  },
}));
