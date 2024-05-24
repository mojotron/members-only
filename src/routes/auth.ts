import express from 'express';
import { checkSchema } from 'express-validator';
import {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
} from '../controllers/auth';
import createUserValidation from '../utils/validatorsConfig';

const router = express.Router();

router.get('/', (req, res) => {
  return res.render('pages/index', { errors: {} });
});

router.get('/register', registerGet);
router.post('/register', checkSchema(createUserValidation), registerPost);
router.get('/login', loginGet);
router.post('/login', loginPost);

export default router;
