import { NextFunction, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { validationResult, FieldValidationError } from 'express-validator';
import User from '../models/user';
import { generatePassword } from '../utils/passwordHelpers';
import { LoginError } from '../errors/index';

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
    inputValues: {
      username: '',
      password: '',
    },
  });
};

const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorsObj: { [key: string]: string } = {};
      errors.array().forEach(err => {
        const { path, msg } = err as FieldValidationError;
        errorsObj[path] = msg;
      });

      const { username, password } = req.body;

      throw new LoginError('unsuccessful login', errorsObj, {
        username,
        password,
      });
    } else {
      return next();
    }
  } catch (error) {
    return next(error);
  }
};

const loginPost = (req: Request, res: Response) => {
  req.sessionStore.get(req.sessionID, (err, session) => {
    console.log(session);
  });

  if (req.isAuthenticated()) {
    return res.status(200).redirect('/dashboard');
  }
  return res.status(200).render('pages/login', {
    errors: {},
    inputValues: {
      username: '',
      password: '',
    },
  });
};

const logout = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    req.logout(err => {
      if (err) return next(err);
      return res.status(200).redirect('/login');
    });
  }
  return res.status(200).redirect('/login');
};

export {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logout,
  validateLogin,
};
