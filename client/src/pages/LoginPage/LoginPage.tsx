import { Typography } from '@mui/material';
import AuthBox from '@components/AuthBox/AuthBox';
import React from 'react';

const LoginPage:React.FC = () => {
  return (
    <AuthBox>
      <Typography
        variant='h5'
        color='text.primary'
      >
        Welcome Back!
      </Typography>

      <Typography>We are happy that you are with us!</Typography>
    </AuthBox>
  );
};

export default LoginPage;
