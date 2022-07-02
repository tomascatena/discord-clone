import { joiValidator } from '@/middleware/joiValidator';
import { requireAuth } from '@/middleware/requireAuth';
import express, { RequestHandler } from 'express';
import friendsController from './friends.controller';
import friendsValidation from './friends.validation';

const router = express.Router();

/**
 * @route POST api/v1/friends/sendInvitation
 * @desc Send invitation to a user
 * @access Private
 */
router.post(
  '/sendInvitation',
  requireAuth as RequestHandler[],
  joiValidator.body(friendsValidation.sendInvitationSchema),
  friendsController.sendInvitation
);

/**
 * @route POST api/v1/friends/invitation/accept
 * @desc Accept friend invitation request from user
 * @access Private
 */
router.post(
  '/invitation/accept',
  requireAuth as RequestHandler[],
  joiValidator.body(friendsValidation.invitationDecisionSchema),
  friendsController.acceptInvitation
);

/**
 * @route POST api/v1/friends/invitation/reject
 * @desc Reject friend invitation request from user
 * @access Private
 */
router.post(
  '/invitation/reject',
  requireAuth as RequestHandler[],
  joiValidator.body(friendsValidation.invitationDecisionSchema),
  friendsController.rejectInvitation
);

export default router;
