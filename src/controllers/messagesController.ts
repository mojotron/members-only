import { Request, Response, NextFunction } from "express";

import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
import { insertMessage, selectMessagesByUserUid } from "../db/queries.js";
import type { AppUserType } from "../types/userTypes.js";
import type { MessageCardType } from "../types/messagesTypes.js";
import isMember from "../utils/isMember.js";
import { timeDistance } from "../utils/formatTime.js";

const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const currentUser = req.user as AppUserType;
    const currentUserIsMember = isMember(req);

    const messages = await selectMessagesByUserUid(currentUser.userUid);

    const messagesModified = messages.map((msg) => ({
      ...msg,
      member: currentUserIsMember,
      author: msg.userUid === currentUser.userUid,
      createdAt: timeDistance(msg.createdAt),
    }));

    console.log(messagesModified);

    return res.status(StatusCodes.OK).render("pages/messages", {
      isAuth: req.isAuthenticated(),
      messages: messagesModified,
    });
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
