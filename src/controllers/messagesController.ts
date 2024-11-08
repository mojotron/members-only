import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
// DB queries
import {
  insertMessage,
  selectMessagesByUserUid,
  selectMessageByUid,
  updateMessage,
} from "../db/queries.js";
// types
import type { AppUserType } from "../types/userTypes.js";
import type { MessageCardType } from "../types/messagesTypes.js";
// helpers
import isMember from "../utils/isMember.js";
import { timeDistance } from "../utils/formatTime.js";

// GET
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

// CREATE
const createMessageView = (req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.OK).render("pages/message-form", {
    actionPath: `/messages/new`,
    edit: false,
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

// EDIT
const editMessageView = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { messageUid } = req.params;
    const currentUser = req.user as AppUserType;
    const message = await selectMessageByUid(messageUid as string);

    if (message === undefined || message.userUid !== currentUser.userUid) {
      return res.status(StatusCodes.BAD_REQUEST).render("pages/error", {
        isAuth: req.isAuthenticated(),
        heading: `Bad Request`,
        message: `You can't edit this message!`,
      });
    }

    return res.status(StatusCodes.OK).render("pages/message-form", {
      actionPath: `/messages/${messageUid}/edit`,
      edit: true,
      values: {
        title: message.title,
        text: message.text,
      },
      errors: [],
    });
  } catch (error) {
    return next(error);
  }
};

const editMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { messageUid } = req.params;
    const { text, title } = matchedData(req);
    await updateMessage(messageUid as string, title, text);
    return res.status(StatusCodes.OK).redirect("/messages");
  } catch (error) {
    return next(error);
  }
};

export {
  getMessages,
  createMessageView,
  createMessage,
  editMessageView,
  editMessage,
};
