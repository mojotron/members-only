import express from 'express';
import { signUpGet, signUpPost } from '../controllers/auth';

const router = express.Router();

router.get('/sign-up', signUpGet);
router.post('/sign-up', signUpPost);

export default router;
