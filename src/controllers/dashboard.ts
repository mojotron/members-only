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

      const stories = getCurrentUserStories.map(storyEle => {
        const { title, story, _id, createdAt } = storyEle;
        return { title, story, storyId: _id, createdAt: timeFormat(createdAt) };
      });

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

        return res.status(200).render('pages/story-form', {
          errors: errorsObj,
          inputValues: {
            title: req.body.title,
            story: req.body.story,
          },
        });
      }

      const { title, story } = matchedData(req);
      const { userId } = req.user as { userId: string };

      const newStory = new Story({ title, story, createdBy: userId });
      await newStory.save();

      return res.status(200).redirect('/dashboard');
    } catch (error) {
      return next(error);
    }
  },
);

const getEditStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storyId } = req.params;
      const storyDoc = await Story.findById(storyId).exec();
      console.log(storyDoc);

      if (storyDoc === null) {
        throw new Error('story not found');
      }
      return res.status(200).render('pages/story-form', {
        errors: {},
        inputValues: {
          title: storyDoc.title,
          story: storyDoc.story,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
);

const postEditStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errorsObj: { [key: string]: string } = {};

        result.array().forEach(err => {
          const { path, msg } = err as FieldValidationError;
          if (errorsObj[path] === undefined) errorsObj[path] = msg;
        });

        return res.status(200).render('pages/story-form', {
          errors: errorsObj,
          inputValues: {
            title: req.body.title,
            story: req.body.story,
          },
        });
      }

      const { storyId } = req.params;
      const { title, story } = matchedData(req);
      const patchedStory = await Story.findByIdAndUpdate(storyId, {
        title,
        story,
      });

      if (patchedStory === null) {
        throw new Error('story not found');
      }

      return res.status(200).redirect('/dashboard');
    } catch (error) {
      return next(error);
    }
  },
);

const getDeleteStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findById(storyId).exec();

      if (story === null) {
        throw new Error('could not find story');
      }
      return res
        .status(200)
        .render('pages/confirm-delete', { storyTitle: story.title, storyId });
    } catch (error) {
      return next(error);
    }
  },
);

const postDeleteStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storyId } = req.params;
      const deletedStory = await Story.findByIdAndDelete(storyId);
      if (deletedStory === null) {
        throw new Error('could not delete story');
      }
      return res.status(200).redirect('/dashboard');
    } catch (error) {
      return next(error);
    }
  },
);

export {
  getDashboard,
  getNewStory,
  postNewStory,
  getEditStory,
  postEditStory,
  getDeleteStory,
  postDeleteStory,
};
