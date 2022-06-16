import { loginSchema } from './auth.validation';
import { loginUser } from './auth.controller';
import { validator } from '@middleware/validator';
import express from 'express';

const router = express.Router();

/**
 * @route POST api/v1/auth
 * @desc Login a user
 * @access Private
 */
router.post('/login', validator.body(loginSchema), loginUser);

export default router;
