import express from 'express';
import {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
} from '../controllers/auth';

import signupValidator from '../validators/signUp';

const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/index', { errors: {} });
});

router.get('/sign-up', signUpGet);
router.post('/sign-up', signupValidator, signUpPost);
router.get('/login', loginGet);
router.post('/login', loginPost);

export default router;
