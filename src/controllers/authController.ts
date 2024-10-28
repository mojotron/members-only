import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const getSignup = (req: Request, res: Response) => {
  res.status(StatusCodes.OK).render("pages/sign-up-form");
};

export { getSignup };
