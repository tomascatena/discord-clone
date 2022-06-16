import { env } from '@config/config';
import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(env.PASSWORD_MIN_LENGTH)
    .max(env.PASSWORD_MAX_LENGTH)
    .required(),
  confirmPassword: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
});
