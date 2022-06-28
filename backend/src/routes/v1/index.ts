import authRoutes from '@/features/auth/auth.route';
import docsRoutes from '../../features/docs/docs.route';
import express from 'express';
import friendsRoutes from '@/features/friends/friends.route';
import userRoutes from '@/features/user/user.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/friends', friendsRoutes);

router.use('/docs', docsRoutes);

export default router;
