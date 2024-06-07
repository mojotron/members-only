import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Story from '../models/story';
//
import { QUERY_LIMIT } from '../constants/constants';
import timeFormat from '../utils/timeFormat';

const getStories = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { search, page } = req.query;
      let queryObject = {};

      if (search !== undefined) {
        const reqExp = new RegExp(search.toString().split('+').join(' '));

        queryObject = {
          $or: [{ title: reqExp }, { story: reqExp }],
        };
      }

      if (!req.isAuthenticated()) {
        return res
          .status(StatusCodes.UNAUTHORIZED)
          .render('pages/index', { isAuth: false, stories: [] });
      }

      const pageNum = parseInt(page as string, 10) || 1;
      const skip = (pageNum - 1) * QUERY_LIMIT;

      const stories = await Story.find(queryObject)
        .skip(skip)
        .limit(QUERY_LIMIT);

      const fullLimit = stories.length === QUERY_LIMIT;

      const modifiedStories = stories.map(storyEle => {
        const { title, story, _id, createdAt } = storyEle;
        return { title, story, storyId: _id, createdAt: timeFormat(createdAt) };
      });

      return res.status(StatusCodes.OK).render('pages/index', {
        isAuth: req.isAuthenticated(),
        stories: modifiedStories,
        hasNext: fullLimit,
        searchTerm: search || '',
        page: pageNum,
      });
    } catch (error) {
      return next(error);
    }
  },
);

export default getStories;
