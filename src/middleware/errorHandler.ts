/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { LoginError, StoryNotExists } from '../errors/index';

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof LoginError) {
    return res.status(err.statusCode).render('pages/login', {
      errors: err.errorObject,
      inputValues: err.inputValues,
    });
  }

  if (err instanceof StoryNotExists) {
    return res
      .status(err.statusCode)
      .render('pages/error', { statusCode: err.statusCode, msg: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('pages/error', {
    statusCode: 'Internal Server Error',
    msg: 'Something went wrong, please try again later, sorry :(',
  });
};

export default errorHandlerMiddleware;
