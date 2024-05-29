import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import {
  FieldValidationError,
  matchedData,
  validationResult,
} from 'express-validator';
import Story from '../models/story';
import timeFormat from '../utils/timeFormat';

const getDashboard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = req.user as { userId: string };
      const getCurrentUserStories = await Story.find({
        createdBy: userId,
      }).exec();

      const stories = getCurrentUserStories.map(story => {
        const { title, body, _id, createdAt } = story;
        return { title, body, storyId: _id, createdAt: timeFormat(createdAt) };
      });
      console.log(getCurrentUserStories);

      return res.status(200).render('pages/dashboard', {
        stories,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getNewStory = (req: Request, res: Response) => {
  return res.render('pages/story-form.ejs', { errors: {}, inputValues: {} });
};

const postNewStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errorsObj: { [key: string]: string } = {};

        result.array().forEach(err => {
          const { path, msg } = err as FieldValidationError;
          if (errorsObj[path] === undefined) errorsObj[path] = msg;
        });

        return res
          .status(200)
          .render('pages/story-form', { errors: {}, inputValues: {} });
      }

      const { title, body } = matchedData(req);
      const { userId } = req.user as { userId: string };

      const newStory = new Story({ title, body, createdBy: userId });
      await newStory.save();

      return res.status(200).redirect('/dashboard');
    } catch (error) {
      return next(error);
    }
  },
);

const getEditStory = () => {};

const postEditStory = () => {};

const getDeleteStory = () => {};

const postDeleteStory = () => {};

export {
  getDashboard,
  getNewStory,
  postNewStory,
  getEditStory,
  postEditStory,
  getDeleteStory,
  postDeleteStory,
};
