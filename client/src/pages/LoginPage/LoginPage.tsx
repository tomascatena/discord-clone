import { LoginForm, LoginPageLayout } from './LoginPage.styled';
import { ROUTES } from '@constants/frontEndRoutes';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { login } from '@store/features/auth/auth.thunk';
import { useActions } from '../../hooks/useActions';
import { useAppDispatch } from '@hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@hooks/useTypedSelector';
import AuthBox from '@components/AuthBox/AuthBox';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomLink from '@components/CustomLink/CustomLink';
import CustomSnackbar from '@components/CustomSnackbar/CustomSnackbar';
import Joi from 'joi';
import React from 'react';

interface ILoginForm {
  email: string;
  password: string;
}

const schema = Joi.object<ILoginForm>({
  email: Joi.string().email({ tlds: { allow: false } }).required().label('Email'),
  password: Joi.string().required().label('Password'),
});

const LoginPage:React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setAlert } = useActions();
  const { loading, isAuthenticated } = useTypedSelector(state => state.auth);
  const { isOpen, message, severity } = useTypedSelector((state) => state.alert);

  const { handleSubmit, control, formState, getValues, setValue } = useForm<ILoginForm>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: joiResolver(schema),
    defaultValues: {
      email: '',
      password: ''
    },
  });

  const onSubmit: SubmitHandler<ILoginForm> = data => {
    if (formState.isValid) {
      dispatch(login(data)).then((data) => {
        if (data.type.includes('rejected')) {
          setAlert({
            isOpen: true,
            message: data.payload?.message!,
            severity: 'error'
          });
        }
      });
    }
  };

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated]);

  return (
    <LoginPageLayout>
      <AuthBox>
        <Typography
          variant='h5'
          color='text.primary'
          align='center'
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
            shouldShowCheckIcon={false}
            setValue={setValue}
            isDisabled={loading}
          />

          <CustomButton
            type='submit'
            isDisabled={loading || !formState.isValid}
            sx={{
              marginTop: '0.8rem',
              marginBottom: '0.8rem'
            }}
          >
              Login
          </CustomButton>

          <CustomLink
            to={ROUTES.REGISTER}
            text="Don't have an account?"
            redirectText='Sign Up'
          />
        </LoginForm>
      </AuthBox>

      <CustomSnackbar
        severity={severity}
        isOpen={isOpen}
        message={message!}
      />
    </LoginPageLayout>
  );
};

export default LoginPage;
