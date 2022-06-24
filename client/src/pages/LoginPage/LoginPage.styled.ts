import { styled } from '@mui/system';

export const LoginPageLayout = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const LoginForm = styled('form')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3)
}));

export const ButtonBox = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: 'flex',
}));
