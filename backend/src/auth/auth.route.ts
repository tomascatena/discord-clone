import { loginSchema, registerSchema } from './auth.validation';
import { loginUser, registerUser } from './auth.controller';
import { validator } from '@middleware/validator';
import express from 'express';

const router = express.Router();

/**
 * @route POST api/v1/auth
 * @desc Register a new user
 * @access Private
 */
router.post('/register', validator.body(registerSchema), registerUser);

router.post('/login', validator.body(loginSchema), loginUser);

export default router;