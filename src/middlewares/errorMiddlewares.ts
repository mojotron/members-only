import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError, UnauthorizedError } from "../errors/index.js";

// NOT FOUND
const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).render("pages/error", {
    errorName: `Page not found`,
    statusCode: StatusCodes.NOT_FOUND,
    message: `Resources you are looking for does not exist!`,
  });
};

// ERRORS
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).render("pages/error", {
      errorName: err.name,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("pages/error", {
    errorName: err.name,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message,
  });
};

export { notFound, errorHandler };
