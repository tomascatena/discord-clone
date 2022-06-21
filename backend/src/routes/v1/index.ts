import authRoutes from '@auth/route/auth.route';
import docsRoutes from '../../features/docs/docs.route';
import express from 'express';
import userRoutes from '@user/user.route';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

router.use('/docs', docsRoutes);

export default router;
