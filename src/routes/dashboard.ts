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
import validateResultsStory from '../middleware/validateResultsStory';

const router = Router();

router.get('/', getDashboard);

router.get('/new-story', getNewStory);
router.post(
  '/new-story',
  checkSchema(createStoryValidator),
  validateResultsStory,
  postNewStory,
);

router.get('/delete/:storyId', getDeleteStory);
router.post('/delete/:storyId', postDeleteStory);

router.get('/edit/:storyId', getEditStory);
router.patch(
  '/edit/:storyId',
  checkSchema(createStoryValidator),
  validateResultsStory,
  postEditStory,
);

export default router;
