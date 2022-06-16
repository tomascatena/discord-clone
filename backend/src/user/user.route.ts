import { joiValidator } from '@middleware/joiValidator';
import { registerSchema } from './user.validation';
import { registerUser } from './user.controller';
import express from 'express';

const router = express.Router();

/**
 * @route POST api/v1/auth
 * @desc Register a new user
 * @access Private
 */
router.post('/register', joiValidator.body(registerSchema), registerUser);

export default router;
