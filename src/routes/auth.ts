import express from 'express';
import { checkSchema } from 'express-validator';
import passport from 'passport';
import {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  validateLogin,
  logout,
} from '../controllers/auth';
import {
  createUserValidation,
  createLoginValidation,
} from '../validators/index';

const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/index', { errors: {} });
});

router.get('/register', registerGet);
router.post('/register', checkSchema(createUserValidation), registerPost);
router.get('/login', loginGet);
router.post(
  '/login',
  checkSchema(createLoginValidation),
  validateLogin,
  passport.authenticate('local'),
  loginPost,
);
router.get('/logout', logout);

export default router;
