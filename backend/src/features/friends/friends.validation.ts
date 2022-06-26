import Joi from 'joi';

const sendInvitationSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
});

export default {
  sendInvitationSchema,
};
