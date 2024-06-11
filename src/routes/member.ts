import express from 'express';
import { getMember, postMember } from '../controllers/member';

const router = express.Router();

router.get('/', getMember);
router.post('/', postMember);

export default router;
