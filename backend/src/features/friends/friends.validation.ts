import Joi from 'joi';

const sendInvitationSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),
});

const invitationDecisionSchema = Joi.object({
  invitationId: Joi.string().required(),
});

export default {
  sendInvitationSchema,
  invitationDecisionSchema,
};
