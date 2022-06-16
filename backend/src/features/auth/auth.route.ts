import { joiValidator } from '@middleware/joiValidator';
import { requireAuth } from '@middleware/requireAuth';
import authController from './auth.controller';
import authValidation from './auth.validation';
import express, { RequestHandler } from 'express';

const router = express.Router();

/**
 * @route   POST api/v1/auth
 * @desc    Login a user
 * @access  Public
 */
router.post(
  '/login',
  joiValidator.body(authValidation.loginSchema),
  authController.loginUser
);

/**
 * @route   GET api/v1/auth
 * @desc    Get auth user
 * @access  Private
 */
router.get('/me', requireAuth as RequestHandler[], authController.getUser);

export default router;
