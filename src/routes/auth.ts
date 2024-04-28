import express from 'express';
import {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
} from '../controllers/auth';

const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/index', { errors: {} });
});

router.get('/sign-up', signUpGet);
router.post('/sign-up', signUpPost);
router.get('/login', loginGet);
router.post('/login', loginPost);

export default router;
