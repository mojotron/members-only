import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError, UnauthorizedError } from "../errors/index.js";
import { STATUS_CODES } from "http";

// NOT FOUND
const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).render("pages/error", {
    isAuth: req.isAuthenticated(),
    heading: `Page not found (${StatusCodes.NOT_FOUND})`,
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
  if (err instanceof UnauthorizedError) {
    return res.status(err.statusCode).render("pages/error", {
      isAuth: req.isAuthenticated(),
      heading: `Authentication Required`,
      message: err.message,
    });
  }

  if (err instanceof CustomError) {
    return res.status(err.statusCode).render("pages/error", {
      isAuth: req.isAuthenticated(),
      heading: `${err.name} ${err.statusCode}`,
      message: err.message,
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).render("pages/error", {
    isAuth: req.isAuthenticated(),
    heading: `${err.name} ${STATUS_CODES.INTERNAL_SERVER_ERROR}`,
    message: err.message,
  });
};

export { notFound, errorHandler };
