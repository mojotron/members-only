import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult, FieldValidationError } from 'express-validator';
import User from 'src/models/user';

const signUpGet = (req: Request, res: Response) => {
  res.status(200).render('pages/sign-up', {
    errors: {},
  });
};

const signUpPost = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    const { password, passwordRepeat } = req.body;

    const equalPasswords = password === passwordRepeat;

    if (!errors.isEmpty() && !equalPasswords) {
      const errorsObj: { [key: string]: string } = {};
      errors.array().forEach(err => {
        const { path, msg } = err as FieldValidationError;
        errorsObj[path] = msg;
      });
      if (!equalPasswords)
        errorsObj.notEqualPasswords = 'passwords must be equal';

      return res.status(200).render('pages/sign-up', { errors: errorsObj });
    }
    res.status(200).render('pages/sign-up', { errors: {} });
  },
);

const loginGet = (req: Request, res: Response) => {
  res.status(200).render('pages/login', {
    errors: {},
  });
};

const loginPost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('pages/login');
};

export { signUpGet, signUpPost, loginGet, loginPost };
