import { Button, Typography } from '@mui/material';
import { ButtonBox, LoginPageLayout, StyledForm } from './LoginPage.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import AuthBox from '@components/AuthBox/AuthBox';
import CustomInput from '../../components/CustomInput/CustomInput';
import Joi from 'joi';
import React from 'react';

interface ILoginForm {
  email: string
  password: string
}

const schema = Joi.object<ILoginForm>({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  password: Joi.string().required().label('Password'),
});

const LoginPage:React.FC = () => {
  const { handleSubmit, control, formState, getValues } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: joiResolver(schema),
    mode: 'all'
  });

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    console.log(data);
  };

  return (
    <LoginPageLayout>
      <AuthBox>
        <Typography
          variant='h5'
          color='text.primary'
        >
          Welcome Back!
        </Typography>

        <Typography color='text.primary'>We are happy that you are with us.</Typography>

        <StyledForm
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            name='email'
            control={control}
            placeholder='Enter E-Mail address'
            labelText='Email'
            type='email'
            inputValue={getValues().email}
            isTouched={formState.touchedFields.email}
            validationError={formState.errors.email}
          />

          <CustomInput
            name='password'
            control={control}
            placeholder='Enter Password'
            labelText='Password'
            type='password'
            inputValue={getValues().password}
            isTouched={formState.touchedFields.password}
            validationError={formState.errors.password}
          />

          <ButtonBox>
            <Button
              variant='contained'
              type='submit'
            >
              Submit
            </Button>
          </ButtonBox>
        </StyledForm>
      </AuthBox>
    </LoginPageLayout>
  );
};

export default LoginPage;
