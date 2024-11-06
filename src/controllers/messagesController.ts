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

const createMessageView = (req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.OK).render("pages/message-form", {
    actionPath: `/messages/new`,
    values: {
      title: "",
      text: "",
    },
    errors: [],
  });
};

const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export { getMessages, createMessageView, createMessage };
