import { Request, Response, NextFunction } from 'express';
import User from 'src/models/user';

const signUp = (req: Request, res: Response, next: NextFunction) => {
  res.send('signUp');
};

const logIn = (req: Request, res: Response, next: NextFunction) => {
  res.send('signUp');
};

const logOut = (req: Request, res: Response, next: NextFunction) => {
  res.send('signUp');
};

export { signUp, logIn, logOut };
