import { joiValidator } from '@middleware/joiValidator';
import express from 'express';
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
  joiValidator.body(friendsValidation.sendInvitationSchema),
  friendsController.sendInvitation
);

export default router;
