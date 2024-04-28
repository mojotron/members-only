/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render('pages/error', {
    statusCode: 'Internal Server Error',
    msg: 'Something went wrong, please try again later, sorry :(',
  });
};

export default errorHandlerMiddleware;
