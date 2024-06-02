import { Router } from 'express';
import authRoutes from './auth';
import dashboardRoutes from './dashboard';

const router = Router();

router.get('/', (req, res) => {
  console.log('GOOD PLACE');

  console.log(req.isAuthenticated());

  return res
    .status(200)
    .render('pages/index', { isAuth: req.isAuthenticated(), stories: [] });
});

router.use(authRoutes);
router.use('/dashboard', dashboardRoutes);

export default router;
