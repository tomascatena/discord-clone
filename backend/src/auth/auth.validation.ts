import { env } from '@config/config';
import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(env.PASSWORD_MIN_LENGTH)
    .max(env.PASSWORD_MAX_LENGTH)
    .required(),
});

export default {
  loginSchema,
};
