import { Typography } from '@mui/material';
import AuthBox from '@components/AuthoBox/AuthBox';
import React from 'react';

const RegisterPage:React.FC = () => {
  return (
    <AuthBox>
      <Typography
        align='center'
        variant='h4'
      >
        Register Page
      </Typography>
    </AuthBox>
  );
};

export default RegisterPage;
