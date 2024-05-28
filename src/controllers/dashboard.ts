import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

const getDashboard = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).render('pages/dashboard');
    } catch (error) {
      return next(error);
    }
  },
);

const getNewStory = (req: Request, res: Response) => {
  console.log('GOOD PLACE ');

  return res.render('pages/story-form.ejs', { errors: {} });
};

const postNewStory = () => {};

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
