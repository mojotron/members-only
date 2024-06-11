import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import Story from '../models/story';
import User from '../models/user';
//
import { QUERY_LIMIT } from '../constants/constants';
import timeFormat from '../utils/timeFormat';
import { StoryNotExists, BadRequestError } from '../errors/index';

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
        const userCount = await User.countDocuments({});
        const storyCount = await Story.countDocuments({});

        return res.status(StatusCodes.UNAUTHORIZED).render('pages/index', {
          isAuth: false,
          stories: [],
          userCount,
          storyCount,
        });
      }

      const pageNum = parseInt(page as string, 10) || 1;
      const skip = (pageNum - 1) * QUERY_LIMIT;

      const stories = await Story.find(queryObject)
        .skip(skip)
        .limit(QUERY_LIMIT);

      const fullLimit = stories.length === QUERY_LIMIT;

      const modifiedStories = stories.map(storyEle => {
        const { title, story, _id, createdAt, createdBy } = storyEle;

        return {
          title,
          story,
          storyId: _id,
          createdAt: timeFormat(createdAt),
          createdBy: createdBy.toString(),
        };
      });

      const { userId } = req.user as { userId: string };

      return res.status(StatusCodes.OK).render('pages/index', {
        isAuth: req.isAuthenticated(),
        stories: modifiedStories,
        hasNext: fullLimit,
        searchTerm: search || '',
        page: pageNum,
        currentUserId: userId.toString(),
      });
    } catch (error) {
      return next(error);
    }
  },
);

const getStoryDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { storyId } = req.params;
      const story = await Story.findById(storyId);

      if (story === null) {
        throw new StoryNotExists(`no story with id: ${storyId}`);
      }

      const author = await User.findById(story.createdBy);

      if (author === null) {
        throw new BadRequestError(`could not find author of current post`);
      }

      const { userId } = req.user as { userId: string };

      return res.status(StatusCodes.OK).render('pages/story-details', {
        story: {
          storyId: story._id,
          title: story.title,
          story: story.story,
          createdAt: timeFormat(story.createdAt),
        },
        author: { username: author.username },
        isAuth: req.isAuthenticated(),
        createdByCurrentUser: userId.toString() === author._id.toString(),
      });
    } catch (error) {
      return next(error);
    }
  },
);

export { getStories, getStoryDetails };
