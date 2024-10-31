import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(StatusCodes.OK).render("pages/sign-up-form");
  } catch (error) {
    return next(error);
  }
};
export { signUp };
