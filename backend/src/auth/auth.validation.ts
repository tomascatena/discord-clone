import Joi from 'joi';

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(25).required(),
  password_confirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(25).required(),
});
