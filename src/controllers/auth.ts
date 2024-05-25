import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult, FieldValidationError } from 'express-validator';
import User from '../models/user';
import { generatePassword } from '../utils/passwordHelpers';

const registerGet = (req: Request, res: Response) => {
  res.status(200).render('pages/register', {
    errors: {},
  });
};

const registerPost = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const { firstName, lastName, username, password, passwordRepeat } = req.body;

  const equalPasswords = password === passwordRepeat;

  if (!errors.isEmpty() && !equalPasswords) {
    const errorsObj: { [key: string]: string } = {};
    errors.array().forEach(err => {
      const { path, msg } = err as FieldValidationError;
      errorsObj[path] = msg;
    });

    if (!equalPasswords)
      errorsObj.notEqualPasswords = 'passwords must be equal';

    return res.status(200).render('pages/register', { errors: errorsObj });
  }

  const hashedPassword = await generatePassword(password);
  const newUser = new User({
    firstName,
    lastName,
    username,
    password: hashedPassword,
  });

  await newUser.save();

  return res.status(200).redirect('/login');
});

const loginGet = (req: Request, res: Response) => {
  res.status(200).render('pages/login', {
    errors: {},
  });
};

const loginPost = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).render('pages/login');
};

const logout = () => {};

export { registerGet, registerPost, loginGet, loginPost, logout };
