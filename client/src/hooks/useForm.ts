import { ValidatorResult } from '@utils/validator/validator';
import { useState } from 'react';

type Values<T, S> = { [K in keyof T]: S };

interface FormProps<T> {
  initialValues: T;
  onSubmit?: () => void;
  validationRules: { [K in keyof Partial<T>]: (value: string) => ValidatorResult };
}

export function useForm<T>(formProps: FormProps<T>) {
  const { initialValues, validationRules } = formProps;

  function createInitialObject<U>(initialValue: U) {
    return Object.keys(initialValues).reduce((ret, key) => {
      const k = key as keyof T;

      ret[k] = initialValue;

      return ret;
    }, {} as Record<keyof T, U>);
  }

  const initialTouched = createInitialObject<boolean>(false);

  console.log(initialTouched);

  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Values<T, boolean>>(initialTouched);
  const [focused, setFocused] = useState<Values<T, boolean>>(initialTouched);

  const handleChange = (event: any) => {
    setValues({
      ...values,
      [event.target.name as keyof T]: event.target.value,
    });
  };

  const handleBlur = (event: any) => {
    console.log('blur event', event);

    setTouched({
      ...touched,
      [event.target.name as keyof T]: true,
    });
  };

  const handleFocus = (event: any) => {
    console.log('focus event', event);

    setFocused({
      ...focused,
      [event.target.name as keyof T]: true,
    });

    setTouched({
      ...touched,
      [event.target.name as keyof T]: true,
    });
  };

  const validation = (key: keyof T) => {
    const value = values[key];

    if (typeof value === 'string') {
      return validationRules[key](value).exec();
    }
  };

  return {
    values,
    touched,
    focused,
    handleChange,
    handleBlur,
    handleFocus,
    validation,
  };
}
