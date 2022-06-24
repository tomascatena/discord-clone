import { ButtonBox, LoginForm, LoginPageLayout } from './LoginPage.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import AuthBox from '@components/AuthBox/AuthBox';
import CustomButton from '@components/CustomButton/CustomButton';
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
  const { handleSubmit, control, formState, getValues, setValue } = useForm<ILoginForm>({
    defaultValues: {
      email: '',
      password: ''
    },
    resolver: joiResolver(schema),
    mode: 'all',
    reValidateMode: 'onChange',
  });

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    console.log(data);

    if (formState.isValid) {
      console.log('Form is valid');
    }
  };

  return (
    <LoginPageLayout>
      <AuthBox>
        <Typography
          variant='h5'
          color='text.primary'
          sx={{
            marginBottom: '1rem'
          }}
        >
          Welcome Back!
        </Typography>

        <LoginForm
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            name='email'
            control={control}
            placeholder='Your E-Mail address'
            labelText='Email'
            type='email'
            inputValue={getValues().email}
            isTouched={formState.touchedFields.email}
            validationError={formState.errors.email}
            shouldShowCheckIcon={false}
            setValue={setValue}
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
            shouldShowCheckIcon={false}
            setValue={setValue}
          />

          <ButtonBox>
            <CustomButton type='submit'>
              Login
            </CustomButton>
          </ButtonBox>
        </LoginForm>
      </AuthBox>
    </LoginPageLayout>
  );
};

export default LoginPage;
