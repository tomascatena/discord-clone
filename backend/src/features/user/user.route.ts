import { joiValidator } from '@/middleware/joiValidator';
import express from 'express';
import userController from './user.controller';
import userValidation from './user.validation';

const router = express.Router();

/**
 * @route POST api/v1/users/register
 * @desc Register a new user
 * @access Private
 */
router.post(
  '/register',
  joiValidator.body(userValidation.registerSchema),
  userController.registerUser
);

export default router;
