import { styled } from '@mui/system';

export const NewMessageContainer = styled('div')(({ theme }) => ({
  height: '6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(1),
  gap: theme.spacing(1),
}));

export const StyledInputContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: theme.spacing(1),
  borderRadius: theme.spacing(2),
  height: '100%',
  width: '100%',
}));

export const StyledInput = styled('textarea')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  height: '100%',
  width: '100%',
  padding: theme.spacing(1),
  fontSize: (theme.typography as any).fontSize,
  resize: 'none',
  border: 'none',
  fontFamily: (theme.typography as any).fontFamily,
}));
