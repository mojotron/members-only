import { Router } from 'express';
import { latestStories, filterStories } from '../controllers/index';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';

const router = Router();

router.get('/', latestStories);
router.post('/', filterStories);

router.use(authRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
