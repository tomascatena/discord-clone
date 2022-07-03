import { ROUTES } from '@/constants/frontEndRoutes';
import { RegisterForm, RegisterPageLayout } from './RegisterPage.styled';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { register } from '@/store/features/auth/auth.thunk';
import { useActions } from '@/hooks/useActions';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import AuthBox from '@/components/AuthBox/AuthBox';
import CustomButton from '@/components/ui-elements/CustomButton/CustomButton';
import CustomInput from '@/components/ui-elements/CustomInput/CustomInput';
import CustomLink from '@/components/ui-elements/CustomLink/CustomLink';
import CustomSnackbar from '@/components/ui-elements/CustomSnackbar/CustomSnackbar';
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
  const navigate = useNavigate();
  const { setAlert } = useActions();
  const { loading, isAuthenticated } = useTypedSelector(state => state.auth);
  const { isOpen, message, severity } = useTypedSelector((state) => state.alert);

  const { handleSubmit, control, formState, getValues, setValue } = useForm<IRegisterForm>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
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
      dispatch(register(data)).then((data) => {
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
            isDisabled={loading}
            setValue={setValue}
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
            isDisabled={loading}
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
            isDisabled={loading}
            setValue={setValue}
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
            isDisabled={loading}
            setValue={setValue}
          />

          <CustomButton
            type='submit'
            isDisabled={!formState.isValid}
            isLoading={loading}
            text='Register'
            sx={{
              marginTop: '0.8rem',
              marginBottom: '0.8rem'
            }}
          />

          <CustomLink
            to={ROUTES.LOGIN}
            text="Already have an account?"
            redirectText='Login'
          />
        </RegisterForm>
      </AuthBox>

      <CustomSnackbar
        severity={severity}
        isOpen={isOpen}
        message={message!}
      />
    </RegisterPageLayout>
  );
};

export default RegisterPage;
