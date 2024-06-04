import { Router } from 'express';
import getStories from '../controllers/index';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';

const router = Router();

router.get('/', getStories);

router.use(authRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
