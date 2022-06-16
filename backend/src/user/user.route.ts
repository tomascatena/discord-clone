import { registerSchema } from './user.validation';
import { registerUser } from './user.controller';
import { validator } from '@middleware/validator';
import express from 'express';

const router = express.Router();

/**
 * @route POST api/v1/auth
 * @desc Register a new user
 * @access Private
 */
router.post('/register', validator.body(registerSchema), registerUser);

export default router;
