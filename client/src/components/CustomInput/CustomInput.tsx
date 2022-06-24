import { Controller, FieldError } from 'react-hook-form';
import {
  FilledInput,
  FormControl,
  FormHelperText,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import React from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

type Props = {
  inputValue: string;
  labelText: string;
  type: 'text' | 'password' | 'email';
  name:string;
  control: any;
  isTouched: boolean | undefined,
  placeholder?: string;
  shouldShowCheckIcon?: boolean
  variant?: 'standard' | 'outlined' | 'filled';
  validationError?: FieldError | undefined;
  isDisabled?: boolean
}

const CustomInput:React.FC<Props> = ({
  inputValue,
  labelText,
  type,
  placeholder = '',
  name,
  isTouched,
  control,
  variant = 'outlined',
  validationError,
  shouldShowCheckIcon = true,
  isDisabled = false
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  let inputType = type;
  if (type === 'password') {
    inputType = showPassword ? 'text' : 'password';
  }

  const endAdornment = (
    <InputAdornment position='end'>
      {
        shouldShowCheckIcon &&
        !validationError &&
        isTouched &&
        <CheckIcon color='success' />
      }

      {type === 'password' && (
        <IconButton
          aria-label='toggle password visibility'
          onClick={() => setShowPassword(!showPassword)}
          edge='end'
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      )}
    </InputAdornment>
  );

  type InputColor = 'error' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | undefined;
  const inputColor: InputColor = !validationError && inputValue && isTouched ? 'success' : undefined;

  const props = {
    ...((variant !== 'filled') && { color: inputColor }),
    type: inputType,
    placeholder,
    endAdornment: endAdornment,
    label: labelText,
    disabled: isDisabled,
  };

  let ElementType = FilledInput;
  if (variant === 'filled') {
    ElementType = FilledInput;
  } else if (variant === 'standard') {
    ElementType = Input;
  } else if (variant === 'outlined') {
    ElementType = OutlinedInput;
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) =>
        <FormControl
          sx={{ width: '100%', mt: 1 }}
          color={inputColor}
          error={Boolean(validationError)}
        >
          <InputLabel>{labelText}</InputLabel>

          {React.createElement(ElementType, { ...props, ...field })}

          {validationError && <FormHelperText>{validationError.message?.replaceAll('"', '')}</FormHelperText>}
        </FormControl>
      }
    />
  );
};

export default CustomInput;
