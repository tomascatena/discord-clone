import authRoutes from '@auth/auth.route';
import docsRoutes from '../../features/docs/docs.route';
import express from 'express';
import friendsRoutes from '@friends/friends.route';
import userRoutes from '@user/user.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/friends', friendsRoutes);

router.use('/docs', docsRoutes);

export default router;
