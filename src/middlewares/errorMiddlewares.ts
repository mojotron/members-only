import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).render("pages/error", {});
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(err.stack);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .render("pages/error", {});
};

export { notFound, errorHandler };
