import { NextFunction, Request, Response } from "express";

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.isAuthenticated()) return next();
    else throw new Error("not authenticated");
  } catch (error) {
    return next(error);
  }
};

export default isAuthenticated;
