import { styled } from '@mui/system';

export const CustomInputContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  width: '100%',
  padding: '0.5rem 0'
});

export const StyledInput = styled('input')(({ theme }) => ({
  fontFamily: 'inherit',
  flexGrowth: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '5px',
  color: theme.palette.text.primary,
  background: '#35393f',
  margin: 0,
  fontSize: '16px',
  padding: '0.5rem',
}));

export const StyledLabel = styled('label')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: '600',
  fontSize: '16px',
  padding: '0.5rem 0',
}));
