import authRoutes from '@auth/auth.route';
import express from 'express';
import userRoutes from '@user/user.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
