import { styled } from '@mui/system';

export const LoginPageLayout = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#5065F2',
});

export const StyledForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}));

export const ButtonBox = styled('div')(() => ({
  display: 'flex',
}));
