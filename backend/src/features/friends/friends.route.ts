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

export default router;
