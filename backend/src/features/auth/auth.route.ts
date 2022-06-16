import { joiValidator } from '@middleware/joiValidator';
import { requireAuth } from '@middleware/requireAuth';
import authController from './auth.controller';
import authValidation from './auth.validation';
import express, { RequestHandler } from 'express';

const router = express.Router();

/**
 * @route POST api/v1/auth
 * @desc Login a user
 * @access Private
 */
router.post(
  '/login',
  requireAuth as RequestHandler[],
  joiValidator.body(authValidation.loginSchema),
  authController.loginUser
);

export default router;
