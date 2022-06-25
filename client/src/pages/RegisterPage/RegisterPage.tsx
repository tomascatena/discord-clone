import { ROUTES } from '@constants/frontEndRoutes';
import { RegisterForm, RegisterPageLayout } from './RegisterPage.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { register } from '@store/features/auth/auth.thunk';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import AuthBox from '@components/AuthBox/AuthBox';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomLink from '@components/CustomLink/CustomLink';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import Joi from 'joi';
import React from 'react';

interface IRegisterForm {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
}

const schema = Joi.object<IRegisterForm>({
  username: Joi.string().min(2).max(16).required().label('Username'),
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  password: Joi.string().min(6).max(24).required().label('Password'),
  confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({
    messages: {
      'any.only': 'Passwords must match',
    },
  }).label('Confirm Password'),
});

const RegisterPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, isAuthenticated, error } = useTypedSelector(state => state.auth);
  const navigate = useNavigate();

  const { handleSubmit, control, formState, getValues, setValue } = useForm<IRegisterForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
  });

  const onSubmit: SubmitHandler<IRegisterForm> = data => {
    if (formState.isValid) {
      dispatch(register(data));
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated]);

  return (
    <RegisterPageLayout>
      <AuthBox>
        <Typography
          align='center'
          variant='h5'
          color='text.primary'
        >
          Create an account
        </Typography>

        <RegisterForm
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CustomInput
            name='username'
            control={control}
            placeholder='Your Username'
            labelText='Username'
            type='text'
            inputValue={getValues().username}
            isTouched={formState.touchedFields.username}
            validationError={formState.errors.username}
            setValue={setValue}
            isDisabled={loading}
          />

          <CustomInput
            name='email'
            control={control}
            placeholder='Your E-Mail address'
            labelText='Email'
            type='email'
            inputValue={getValues().email}
            isTouched={formState.touchedFields.email}
            validationError={formState.errors.email}
            setValue={setValue}
            isDisabled={loading}
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
            setValue={setValue}
            isDisabled={loading}
          />

          <CustomInput
            name='confirmPassword'
            control={control}
            placeholder='Please confirm the password'
            labelText='Confirm Password'
            type='password'
            inputValue={getValues().confirmPassword}
            isTouched={formState.touchedFields.confirmPassword}
            validationError={formState.errors.confirmPassword}
            setValue={setValue}
            isDisabled={loading}
          />

          <CustomButton
            type='submit'
            isDisabled={loading}
            sx={{
              marginTop: '0.8rem',
              marginBottom: '0.8rem'
            }}
          >
            Register
          </CustomButton>

          <CustomLink
            to={ROUTES.LOGIN}
            text="Already have an account?"
            redirectText='Login'
          />
        </RegisterForm>
      </AuthBox>

      <CustomSnackbar
        severity='error'
        isOpen={Boolean(error)}
        message={error?.message!}
      />
    </RegisterPageLayout>
  );
};

export default RegisterPage;
