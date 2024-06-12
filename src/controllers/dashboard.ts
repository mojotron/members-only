import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import Story from '../models/story';
import timeFormat from '../utils/timeFormat';
import { StoryNotExists } from '../errors/index';

const getDashboard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, isMember } = req.user as {
        userId: string;
        isMember: boolean;
      };
      const getCurrentUserStories = await Story.find({
        createdBy: userId,
      }).exec();

      const { username } = req.user as { username: string };

      const stories = getCurrentUserStories.map(storyEle => {
        const { title, story, _id, createdAt } = storyEle;
        return { title, story, storyId: _id, createdAt: timeFormat(createdAt) };
      });

      return res.status(StatusCodes.OK).render('pages/dashboard', {
        stories,
        isAuth: req.isAuthenticated(),
        isMember,
        username,
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getNewStory = (req: Request, res: Response) => {
  return res.status(StatusCodes.OK).render('pages/story-form', {
    errors: {},
    inputValues: {},
    btnText: 'create',
    title: 'Create New Story',
  });
};

const postNewStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // input validation in middlewares
      const { title, story } = matchedData(req);
      const { userId } = req.user as { userId: string };

      const newStory = new Story({ title, story, createdBy: userId });
      await newStory.save();

      return res.status(StatusCodes.OK).redirect('/dashboard');
    } catch (error) {
      return next(error);
    }
  },
);

const getEditStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('EDIT GET');

      const { storyId } = req.params;
      const storyDoc = await Story.findById(storyId).exec();

      if (storyDoc === null)
        throw new StoryNotExists(`no story with id: ${storyId}`);

      return res.status(StatusCodes.OK).render('pages/story-form', {
        errors: {},
        inputValues: {
          title: storyDoc.title,
          story: storyDoc.story,
        },
        btnText: 'edit',
        title: 'Update Story',
      });
    } catch (error) {
      return next(error);
    }
  },
);

const postEditStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      //  input validation in middlewares
      const { storyId } = req.params;

      const { title, story } = matchedData(req);

      const storyDoc = await Story.findByIdAndUpdate(
        storyId,
        { title, story },
        { new: true },
      );

      if (storyDoc === null)
        throw new StoryNotExists(`no story with id: ${storyId}`);

      return res.status(StatusCodes.OK).redirect('/dashboard');
    } catch (error) {
      return next(error);
    }
  },
);

const getDeleteStory = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storyId } = req.params;
      const storyDoc = await Story.findById(storyId).exec();

      if (storyDoc === null)
        throw new StoryNotExists(`no story with id: ${storyId}`);

      return res.status(StatusCodes.OK).render('pages/confirm-delete', {
        storyTitle: storyDoc.title,
        storyId,
      });
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
      if (deletedStory === null)
        throw new StoryNotExists(`no story with id: ${storyId}`);

      return res.status(StatusCodes.OK).redirect('/dashboard');
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
