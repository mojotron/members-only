import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import User from 'src/models/user';

const signUpGet = (req: Request, res: Response) => {
  res.status(200).render('pages/sign-up', {
    errors: {},
  });
};

const signUpPost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('pages/sign-up');
};

const loginGet = (req: Request, res: Response) => {
  res.status(200).render('pages/login', {
    errors: {},
  });
};

const loginPost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('pages/login');
};

export { signUpGet, signUpPost, loginGet, loginPost };
