import { Router } from 'express';
import { checkSchema } from 'express-validator';
import {
  getDashboard,
  getNewStory,
  postNewStory,
  getEditStory,
  postEditStory,
  getDeleteStory,
  postDeleteStory,
} from '../controllers/dashboard';
import { createStoryValidator } from '../validators/index';

const router = Router();

router.get('/', getDashboard);

router.get('/new-story', getNewStory);
router.post('/new-story', checkSchema(createStoryValidator), postNewStory);

export default router;
