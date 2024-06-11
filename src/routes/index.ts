import { Router } from 'express';
import { getStories, getStoryDetails } from '../controllers/index';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';
import memberRoutes from './member';

const router = Router();

router.get('/', getStories);
router.get('/story/:storyId', getStoryDetails);

router.use(authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/member', memberRoutes);

export default router;
