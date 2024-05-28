import { Router } from 'express';
import {
  getDashboard,
  getNewStory,
  postNewStory,
  getEditStory,
  postEditStory,
  getDeleteStory,
  postDeleteStory,
} from '../controllers/dashboard';

const router = Router();

router.get('/', getDashboard);

router.get('/new-story', getNewStory);

export default router;
