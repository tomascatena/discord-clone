import validator from 'validator';

export const DEFAULT_ERROR_MESSAGES = {
  required: 'This field is required.',
  isNumeric: 'Must be a number.',
  isEmail: 'Must be a valid email.',
  isAlpha: 'Must contain only letters.',
  isAlphaWithSpecialCharacters: 'Must contain only letters with or without accents.',
  isURL: 'Must ba a valid URL.',
  isGithubUsername: 'Must ba a valid Github Username.'
};

type Handler = (message?: string, options?: any) => ValidatorResult;
type HandlerNoMessage = (options?: any) => ValidatorResult;
type CustomHandler = (
  message: string | null,
  callback: (value: string) => boolean
) => ValidatorResult;

export interface ValidatorResult {
  required: Handler;
  isNumeric: Handler;
  isAlpha: Handler;
  isAlphaWithSpecialCharacters: Handler;
  isURL: Handler;
  isGithubUsername: Handler;
  isEmail: Handler;
  isLength: HandlerNoMessage;
  custom: CustomHandler;
  exec: () => { isValid: boolean; validationErrors: string[]; value: string };
}

export const validate = (value: string): ValidatorResult => {
  const _errors: string[] = [];
  let _value = value;

  return {
    required(message = DEFAULT_ERROR_MESSAGES.required) {
      if (validator.trim(_value)) {
        return this;
      }

      _errors.push(message);
      return this;
    },
    isNumeric(message = DEFAULT_ERROR_MESSAGES.isNumeric) {
      if (validator.isNumeric(_value)) {
        return this;
      }

      _errors.push(message);
      return this;
    },
    isEmail(message = DEFAULT_ERROR_MESSAGES.isEmail) {
      if (validator.isEmail(_value) && validator.normalizeEmail(_value)) {
        _value = validator.normalizeEmail(_value) || _value;

        return this;
      }

      _errors.push(message);
      return this;
    },
    isLength({ min, max }: { min: number; max: number }) {
      if (validator.isLength(_value, { min, max })) {
        return this;
      }

      _errors.push(`Must be between ${min} and ${max} characters long.`);
      return this;
    },
    isAlpha(message = DEFAULT_ERROR_MESSAGES.isAlpha) {
      if (validator.isAlpha(_value)) {
        return this;
      }

      _errors.push(message);
      return this;
    },
    isAlphaWithSpecialCharacters(message = DEFAULT_ERROR_MESSAGES.isAlphaWithSpecialCharacters) {
      const regex = /^[^\s`~!@#$%^&*()_+={}[\]|\\:;"'<,>.?๐฿]+[a-zA-ZÀ-ÿ\u00f1\u00d1][^\s`~!@#$%^&*()_+={}[\]|\\:;"'<,>.?๐฿]*$/g;
      if (regex.test(_value)) {
        return this;
      }

      _errors.push(message);
      return this;
    },
    custom(message, cb) {
      if (cb(_value) || message === null) {
        return this;
      }

      _errors.push(message);
      return this;
    },
    isURL(message = DEFAULT_ERROR_MESSAGES.isURL) {
      if (validator.isURL(_value)) {
        return this;
      }

      _errors.push(message);
      return this;
    },
    isGithubUsername(message = DEFAULT_ERROR_MESSAGES.isGithubUsername) {
      const regex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
      if (regex.test(_value)) {
        return this;
      }

      _errors.push(message);
      return this;
    },
    exec: () => {
      return {
        value: validator.trim(validator.escape(_value)),
        isValid: _errors.length === 0,
        validationErrors: _errors,
      };
    },
  };
};
