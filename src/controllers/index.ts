import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Story from '../models/story';

const LIMIT = 1;

const getStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { search } = req.query;

    console.log(search);

    let queryObject = {};

    if (search !== undefined) {
      const reqExp = new RegExp(search.toString().split('+').join(' '));
      console.log(reqExp);

      queryObject = {
        $or: [
          { title: { $search: search.toString().split('+').join(' ') } },
          { story: { $search: search.toString().split('+').join(' ') } },
        ],
      };
    }

    try {
      if (!req.isAuthenticated()) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .render('pages/index', { isAuth: false, stories: [] });
      }

      const stories = await Story.find(queryObject).exec();

      return res
        .status(StatusCodes.OK)
        .render('pages/index', { isAuth: req.isAuthenticated(), stories });
    } catch (error) {
      return next(error);
    }
  },
);

export default getStories;
