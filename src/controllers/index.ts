import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Story from '../models/story';

const latestStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.isAuthenticated()) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .render('pages/index', { isAuth: false, stories: [] });
      }

      const stories = await Story.find().limit(10).exec();

      return res
        .status(StatusCodes.OK)
        .render('pages/index', { isAuth: req.isAuthenticated(), stories });
    } catch (error) {
      return next(error);
    }
  },
);

const filterStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stories = await Story.find().limit(10).exec();

      return res.status(StatusCodes.OK).render('pages/index', {
        isAuth: req.isAuthenticated(),
        stories: [...stories, ...stories],
      });
    } catch (error) {
      return next(error);
    }
  },
);

export { latestStories, filterStories };
