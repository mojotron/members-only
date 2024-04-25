import { Request, Response, NextFunction } from 'express';
import User from 'src/models/user';

const signUpGet = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('pages/sign-up', {
    errors: {
      username: 'please provide username',
    },
  });
};

const signUpPost = (req: Request, res: Response, next: NextFunction) => {
  console.log('hello');
  res.status(200).render('pages/sign-up');
};

export { signUpGet, signUpPost };
