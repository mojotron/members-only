import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult, FieldValidationError } from 'express-validator';
import User from '../models/user';
import { generatePassword } from '../utils/passwordHelpers';

const registerGet = (req: Request, res: Response) => {
  res.status(200).render('pages/register', {
    errors: {},
    inputValues: {
      firstName: '',
      lastName: '',
      username: '',
      password: '',
      passwordRepeat: '',
    },
  });
};

const registerPost = asyncHandler(async (req: Request, res: Response) => {
  const errors = validationResult(req);
  const { firstName, lastName, username, password, passwordRepeat } = req.body;

  const equalPasswords = password === passwordRepeat;
  // check unique username
  const checkUser = await User.findOne({ username });

  if (!errors.isEmpty() || !equalPasswords || checkUser !== null) {
    console.log('BUG?');

    const errorsObj: { [key: string]: string } = {};
    errors.array().forEach(err => {
      const { path, msg } = err as FieldValidationError;
      errorsObj[path] = msg;
    });

    if (!equalPasswords)
      errorsObj.notEqualPasswords =
        'password and repeat password must be equal';

    if (checkUser !== null)
      errorsObj.notUniqueUsername = 'username already exists';

    return res.status(200).render('pages/register', {
      errors: errorsObj,
      inputValues: {
        firstName,
        lastName,
        username,
        password,
        passwordRepeat,
      },
    });
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
