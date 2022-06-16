import { Typography } from '@mui/material';
import AuthBox from '@components/AuthoBox/AuthBox';
import React from 'react';

const LoginPage:React.FC = () => {
  return (
    <AuthBox>
      <Typography
        align='center'
        variant='h4'
      >
        Login Page
      </Typography>
    </AuthBox>
  );
};

export default LoginPage;
