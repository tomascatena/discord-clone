import { loginUser, registerUser } from './auth.controller';
import express from 'express';

const router = express.Router();

/**
 * @route POST api/v1/auth
 * @desc Register a new user
 * @access Private
 */
router.post('/register', registerUser);

router.post('/login', loginUser);

export default router;
