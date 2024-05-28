import { Router } from 'express';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';

const router = Router();

router.use(authRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
