import { Request, Response, NextFunction } from "express";
import isMember from "../utils/isMember.js";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
import { insertMessage } from "../db/queries.js";
import type { AppUserType } from "../types/userTypes.js";

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
) => {
  try {
    const { title, text } = matchedData(req);
    const currentUser = req.user as AppUserType;

    await insertMessage(currentUser.userUid, title, text);

    return res.status(StatusCodes.CREATED).redirect("/messages");
  } catch (error) {
    return next(error);
  }
};

export { getMessages, createMessageView, createMessage };
