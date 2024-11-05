import { Request, Response, NextFunction } from "express";
import isMember from "../utils/isMember.js";
import { StatusCodes } from "http-status-codes";

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // TEMP
    return res
      .status(StatusCodes.OK)
      .render("pages/messages", { isAuth: req.isAuthenticated() });
  } catch (error) {
    return next(error);
  }
};

export { getMessages };
