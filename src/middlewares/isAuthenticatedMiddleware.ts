import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/index.js";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.isAuthenticated()) return next();
    else throw new UnauthorizedError();
  } catch (error) {
    return next(error);
  }
};

export default isAuthenticated;
