import { Request, Response, NextFunction } from 'express';
import { FieldValidationError, validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

const validateResultsStory = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const results = validationResult(req);
  if (!results.isEmpty()) {
    const errorObj: { [key: string]: string } = {};

    results.array().forEach(err => {
      const { path, msg } = err as FieldValidationError;
      if (errorObj[path] === undefined) errorObj[path] = msg;
    });

    return res.status(StatusCodes.OK).render('pages/story-form', {
      errors: errorObj,
      inputValues: {
        title: req.body.title,
        story: req.body.story,
        btnText: req.url.includes('create') ? 'create' : 'edit',
      },
    });
  }

  return next();
};

export default validateResultsStory;
