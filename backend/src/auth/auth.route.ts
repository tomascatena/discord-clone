import { joiValidator } from '@middleware/joiValidator';
import { loginSchema } from './auth.validation';
import { loginUser } from './auth.controller';
import { requireAuth } from '@middleware/requireAuth';
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
  joiValidator.body(loginSchema),
  loginUser
);

export default router;
